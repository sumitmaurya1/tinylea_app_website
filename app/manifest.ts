import type { MetadataRoute } from 'next'

// Required by output: 'export' — emitted as a file at build time.
export const dynamic = 'force-static'
import { site } from '@/lib/site'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TinyLearn — Kids Learning Games',
    short_name: 'TinyLearn',
    description: site.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#F0A291',
    theme_color: '#E12E1E',
    categories: ['education', 'kids'],
    icons: [
      { src: '/brand/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/logo.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
    ],
  }
}
