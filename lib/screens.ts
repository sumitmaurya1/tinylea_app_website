import type { Screen } from '@/components/phone-mockup'

/**
 * Real in-app screenshots, resized to 285×640 (the source captures are
 * 1080×2424). Next's image optimizer serves AVIF/WebP derivatives.
 *
 * Order matters: pages address fixed indices (features → 0, languages → 1,
 * download → 3), and `featuredScreens` takes the first five for the
 * five-across carousels.
 */
export const screens: Screen[] = [
  {
    src: '/screenshots/correct-word.png',
    title: 'Alphabet — A to Z',
    alt: 'TinyLearn asking the child to find the word for the letter A, with Apple, Hat, Moon and Rabbit to choose from',
  },
  {
    src: '/screenshots/hindi-varnamala.png',
    title: 'हिन्दी वर्णमाला',
    alt: 'TinyLearn Hindi Varnamala flashcard for the letter अ with the words अनार, अंडा and अनानास',
  },
  {
    src: '/screenshots/numbers.png',
    title: 'Numbers 1–100',
    alt: 'TinyLearn number card for 3, showing Three in English alongside तीन in Hindi and Marathi',
  },
  {
    src: '/screenshots/match-shapes.png',
    title: 'Match the Shapes',
    alt: 'The Match the Shapes mini-game asking the child to match a red square to the labelled shape tiles',
  },
  {
    src: '/screenshots/adventure-map.png',
    title: 'Adventure map',
    alt: 'The TinyLearn adventure map showing levels 6 to 10 along a winding path with the stars earned on each',
  },
  {
    src: '/screenshots/marathi-varnamala.png',
    title: 'मराठी वर्णमाला',
    alt: 'TinyLearn Marathi Varnamala flashcard for the letter अ with the words अननस, अंगठी and अबोली',
  },
  {
    src: '/screenshots/home.png',
    title: 'Home',
    alt: 'The TinyLearn home screen greeting the child, with Fun Games and My Prizes cards showing levels, stars and day streak',
  },
  {
    src: '/screenshots/math-runner.png',
    title: 'Math Runner',
    alt: 'The Math Runner mini-game asking two plus seven while a fox runs across the grass',
  },
  {
    src: '/screenshots/sentence-rocket.png',
    title: 'Sentence Rocket',
    alt: 'The Sentence Rocket mini-game building the sentence "I love apples" from word blocks to fill the rocket fuel bar',
  },
  {
    src: '/screenshots/ocean-cleanup.png',
    title: 'Ocean Clean-up',
    alt: 'The Ocean Clean-up mini-game asking whether 16 is smaller, bigger or the same as 2',
  },
  {
    src: '/screenshots/geo-explorer.png',
    title: 'Geo Explorer',
    alt: 'The Geo Explorer mini-game asking the child to sail two steps south and three steps east to the treasure',
  },
  {
    src: '/screenshots/weather-dressing.png',
    title: 'Weather Dressing',
    alt: 'The Weather Dressing mini-game asking what blocks the wind, with a wind jacket, sun hat and swim shorts to drag',
  },
  {
    src: '/screenshots/dino-feed.png',
    title: 'Synonym Dino Feed',
    alt: 'The Synonym Dino Feed mini-game asking for a word like LARGE, with slow, huge and tiny leaves to drag to the dinosaur',
  },
  {
    src: '/screenshots/pop-the-word.png',
    title: 'Pop the Word',
    alt: 'The Pop the Word mini-game spelling a word starting with B from floating letter bubbles',
  },
]

/** The five-across rows on the home and download pages. */
export const featuredScreens = screens.slice(0, 5)
