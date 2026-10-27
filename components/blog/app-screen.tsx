import { PhoneMockup } from '@/components/phone-mockup'
import { screens } from '@/lib/screens'

/**
 * A real in-app screenshot inside the device frame, for use in MDX.
 *
 * Markdown images are mapped to a fixed 1200x675 frame, which would squash
 * these 285x640 portrait captures — hence a component rather than `![]()`.
 * Alt text comes from lib/screens.ts so it stays in one place.
 */
export function AppScreen({
  name,
  caption,
  align = 'center',
}: {
  /** Filename stem under /public/screenshots, e.g. "hindi-varnamala". */
  name: string
  caption?: string
  align?: 'center' | 'right'
}) {
  const screen = screens.find((s) => s.src === `/screenshots/${name}.png`)

  // A typo in the name shouldn't ship a broken image into an article.
  if (!screen) return null

  return (
    <figure
      className={
        align === 'right'
          ? 'not-prose my-8 sm:float-right sm:ml-7 sm:w-[11rem]'
          : 'not-prose my-10 flex flex-col items-center'
      }
    >
      <div className={align === 'right' ? '' : 'w-[13rem] sm:w-[15rem]'}>
        <PhoneMockup screen={screen} sizes="(max-width: 640px) 60vw, 240px" />
      </div>
      {caption ? (
        <figcaption className="mt-4 max-w-sm text-center text-sm text-[var(--ink-soft)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}
