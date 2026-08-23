import {
  Apple,
  ArrowLeftRight,
  AudioLines,
  Bone,
  BookOpen,
  CloudSun,
  Compass,
  Footprints,
  Palette,
  PawPrint,
  Rocket,
  Shapes,
  Type,
  Waves,
  type LucideIcon,
} from 'lucide-react'

/**
 * Vector icons for the topics whose meaning isn't carried by a letter.
 * Slugs missing here (alphabet, numbers, the varnamalas) render their own
 * glyph instead — there the character *is* the content.
 */
export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  colors: Palette,
  shapes: Shapes,
  phonics: AudioLines,
  animals: PawPrint,
  fruits: Apple,
  opposites: ArrowLeftRight,
  'story-mode': BookOpen,
}

/** One icon per mini-game, in the order they ship in the app. */
export const GAME_ICONS: LucideIcon[] = [
  Shapes,
  Type,
  Footprints,
  Rocket,
  Waves,
  Compass,
  CloudSun,
  Bone,
]
