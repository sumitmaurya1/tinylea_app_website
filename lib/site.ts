/**
 * Single source of truth for every hard fact about the app.
 * Everything on the site (copy, schema, /llms.txt, OG images) reads from here.
 * Swap PLAY_URL / SITE_URL / socials in one place.
 */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tinylearn.app').replace(/\/$/, '')

export const site = {
  name: 'TinyLearn',
  tagline: 'Play · Learn · Grow',
  url: SITE_URL,
  playUrl: 'https://play.google.com/store/apps/details?id=com.tinylearn',
  packageName: 'com.tinylearn',
  printablesUrl: 'https://tinylearnprintables.com',
  contactEmail: 'support@tinylearnapp.com',
  platform: 'Android',
  price: 'Free',
  ageRange: '2–8',
  ageMin: 2,
  ageMax: 8,
  description:
    'TinyLearn is a free educational app for kids ages 2–8. It teaches the alphabet, numbers 1–100, colors, shapes, phonics and more through tap-to-hear lessons and 100+ fun learning games, in English, Hindi and Marathi.',
  /**
   * PLACEHOLDER: replace with real profile URLs before launch.
   * Remove any entry you do not have — an empty `sameAs` is better than a broken one.
   */
  socials: [] as { label: string; href: string }[],
} as const

export const stats = [
  { value: 100, suffix: '+', label: 'Game levels' },
  { value: 11, suffix: '', label: 'Learn topics' },
  { value: 3, suffix: '', label: 'Languages' },
  { value: 8, suffix: '', label: 'Mini-games' },
  { value: 2, suffix: '–8', label: 'Ages' },
] as const

export const languages = [
  {
    key: 'english',
    name: 'English ABC',
    native: 'A B C',
    locale: 'en',
    blurb: 'A to Z with tap-to-hear letter sounds and an example word for every letter.',
  },
  {
    key: 'hindi',
    name: 'Hindi Varnamala',
    native: 'हिन्दी वर्णमाला',
    locale: 'hi',
    blurb: 'The full Hindi alphabet, tap-to-hear, so kids learn how each अक्षर actually sounds.',
  },
  {
    key: 'marathi',
    name: 'Marathi Varnamala',
    native: 'मराठी वर्णमाला',
    locale: 'mr',
    blurb: 'The Marathi alphabet, tap-to-hear, for families raising kids with मराठी at home.',
  },
] as const

/** The 11 learn categories, verbatim from the app. */
export const learnCategories = [
  { slug: 'alphabet', title: 'Alphabet', detail: 'A to Z, tap-to-hear, example words', icon: 'A' },
  { slug: 'hindi-varnamala', title: 'Hindi Varnamala', native: 'वर्णमाला', detail: 'Hindi alphabet, tap-to-hear', icon: 'अ' },
  { slug: 'marathi-varnamala', title: 'Marathi Varnamala', native: 'वर्णमाला', detail: 'Marathi alphabet, tap-to-hear', icon: 'म' },
  { slug: 'numbers', title: 'Numbers', detail: '1–100 in English · हिंदी · मराठी', icon: '12' },
  { slug: 'colors', title: 'Colors', detail: 'Learn with real-life examples (Sky, Grass, Sun)', icon: '◕' },
  { slug: 'shapes', title: 'Shapes', detail: 'Circle, square, triangle & more', icon: '△' },
  { slug: 'phonics', title: 'Phonics', detail: 'Letter sounds for early reading', icon: 'ph' },
  { slug: 'animals', title: 'Animals', detail: 'With sounds', icon: '🐾' },
  { slug: 'fruits', title: 'Fruits', detail: 'Vocabulary', icon: '🍎' },
  { slug: 'opposites', title: 'Opposites', detail: 'Pairs', icon: '⇄' },
  { slug: 'story-mode', title: 'Story Mode', detail: 'Guided stories', icon: '📖' },
] as const

/** The 8 live mini-games. */
export const miniGames = [
  { name: 'Match the Shapes', skill: 'Shape recognition', blurb: 'Drag each shape to the outline that fits it.' },
  { name: 'Pop the Word', skill: 'Vocabulary', blurb: 'Spot and pop the bubble holding the right word.' },
  { name: 'Math Runner', skill: 'Early math', blurb: 'Run, jump and pick the answer before the gap closes.' },
  { name: 'Sentence Rocket', skill: 'Sentence building', blurb: 'Order the words to launch the rocket.' },
  { name: 'Ocean Clean-up', skill: 'Sorting & focus', blurb: 'Sort what belongs in the sea from what does not.' },
  { name: 'Geo Explorer', skill: 'World knowledge', blurb: 'Explore places and match them to their clues.' },
  { name: 'Weather Dressing', skill: 'Reasoning', blurb: 'Dress the character for the weather on screen.' },
  { name: 'Synonym Dino Feed', skill: 'Word meaning', blurb: 'Feed the dino words that mean the same thing.' },
] as const

export const rewards = [
  { title: 'Stars', blurb: 'Every level pays out up to three stars for effort and accuracy.' },
  { title: 'Stickers', blurb: 'A growing sticker book kids can flip through between sessions.' },
  { title: 'Prizes', blurb: 'Collectible prizes that make finishing a tricky level feel worth it.' },
  { title: 'Daily Gift', blurb: 'A spin-the-wheel gift each day — a reason to come back tomorrow.' },
  { title: 'Day streaks', blurb: 'A gentle streak counter that rewards showing up, not marathon sessions.' },
  { title: 'Star of the Day', blurb: 'A shareable progress card. Parents can add the child’s name before sharing.' },
] as const

export const parentTrust = [
  { title: 'Parent Zone behind a parent gate', blurb: 'Settings and anything outside the play area sit behind a math challenge only a grown-up can solve.' },
  { title: 'Works offline', blurb: 'Lessons and games run without a connection — flights, car rides, patchy signal, all fine.' },
  { title: 'Free, with kid-safe ads', blurb: 'TinyLearn is free to play. Ads follow Google’s Families ad policy and carry a visible “Ad” badge.' },
  { title: 'Printable worksheets', blurb: 'Free PDF worksheets on tinylearnprintables.com to take the learning off the screen.' },
] as const

/** FAQ — answers are 40–60 words and written to be quoted verbatim by answer engines. */
export const faqs = [
  {
    q: 'What is TinyLearn?',
    a: 'TinyLearn is a free educational app for kids ages 2–8. It teaches the alphabet, numbers 1–100, colors, shapes, phonics and more through tap-to-hear lessons and 100+ fun learning games, in English, Hindi and Marathi.',
  },
  {
    q: 'What ages is TinyLearn for?',
    a: 'TinyLearn is designed for toddlers, preschoolers and kindergarten children aged 2 to 8.',
  },
  {
    q: 'Does TinyLearn teach Hindi and Marathi?',
    a: 'Yes. TinyLearn teaches the Hindi Varnamala and Marathi Varnamala (alphabets) and counting numbers 1–100 in English, Hindi and Marathi.',
  },
  {
    q: 'Is TinyLearn free?',
    a: 'Yes, TinyLearn is free to download and play, supported by kid-safe ads that follow Google’s Families ad policy.',
  },
  {
    q: 'Does TinyLearn work offline?',
    a: 'Yes, kids can learn and play offline, anywhere.',
  },
  {
    q: 'Is TinyLearn safe for kids?',
    a: 'Yes. A Parent Zone is protected by a parent gate, and ads follow Google’s Designed for Families requirements.',
  },
  {
    q: 'How many games does TinyLearn have?',
    a: '100 game levels across 8 mini-games; each level unlocks the next when your child earns 2 stars.',
  },
  {
    q: 'What devices does TinyLearn support?',
    a: 'TinyLearn is available for Android on Google Play.',
  },
] as const

/** Machine-readable quick facts — rendered as a table on Home, and mirrored into /llms.txt. */
export const quickFacts = [
  { label: 'App name', value: 'TinyLearn' },
  { label: 'Price', value: 'Free (kid-safe ads)' },
  { label: 'Platform', value: 'Android — Google Play' },
  { label: 'Ages', value: '2 to 8 years' },
  { label: 'Languages', value: 'English, Hindi (हिन्दी), Marathi (मराठी)' },
  { label: 'Learn topics', value: '11 — alphabet, Hindi & Marathi Varnamala, numbers 1–100, colors, shapes, phonics, animals, fruits, opposites, story mode' },
  { label: 'Games', value: '100 levels across 8 mini-games' },
  { label: 'Offline', value: 'Yes — works without a connection' },
  { label: 'Parental controls', value: 'Parent Zone behind a parent gate (math challenge)' },
  { label: 'Worksheets', value: 'Free printable PDFs at tinylearnprintables.com' },
] as const

export const navLinks = [
  { href: '/features', label: 'Features' },
  { href: '/languages', label: 'Languages' },
  { href: '/games', label: 'Games' },
  { href: '/for-parents', label: 'For Parents' },
  { href: '/blog', label: 'Blog' },
] as const
