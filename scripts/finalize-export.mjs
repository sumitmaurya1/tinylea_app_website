import fs from 'node:fs'
import path from 'node:path'

/**
 * Next emits generated OG images as extensionless files (out/opengraph-image/
 * opengraph-image). A plain file host has no route table, so those 404 or get
 * served as octet-stream. Rename them to real .png files and repoint every
 * reference in the emitted HTML so the output is host-agnostic.
 */
const OUT = path.join(process.cwd(), 'out')

function walk(dir, hit) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, hit)
    else hit(full)
  }
}

if (!fs.existsSync(OUT)) {
  console.error('finalize-export: no out/ directory — run `next build` first.')
  process.exit(1)
}

// 1. Rename the extensionless OG images.
const renamed = []
walk(OUT, (file) => {
  if (path.basename(file) === 'opengraph-image') {
    fs.renameSync(file, `${file}.png`)
    renamed.push(path.relative(OUT, file))
  }
})

// 2. Flatten out/opengraph-image/opengraph-image.png -> out/opengraph-image.png
//    so the site-wide OG URL is a real file rather than a directory.
const rootDir = path.join(OUT, 'opengraph-image')
const rootFile = path.join(rootDir, 'opengraph-image.png')
if (fs.existsSync(rootFile)) {
  fs.renameSync(rootFile, path.join(OUT, 'opengraph-image.png'))
  if (fs.readdirSync(rootDir).length === 0) fs.rmdirSync(rootDir)
}

// 3. Repoint references. Skips anything already ending in .png.
let patched = 0
walk(OUT, (file) => {
  if (!/\.(html|txt|json|xml|webmanifest)$/.test(file)) return
  const before = fs.readFileSync(file, 'utf8')
  const after = before.replace(/\/opengraph-image(?!\.png)/g, '/opengraph-image.png')
  if (after !== before) {
    fs.writeFileSync(file, after)
    patched++
  }
})

console.log(`finalize-export: ${renamed.length} OG image(s) renamed, ${patched} file(s) repointed`)
