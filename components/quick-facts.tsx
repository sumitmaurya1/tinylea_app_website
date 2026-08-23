import { quickFacts } from '@/lib/site'

/**
 * AEO surface: a plain, machine-readable fact table. Real <table> markup with a
 * row header per fact, so both screen readers and answer engines can parse it.
 */
export function QuickFacts({ id = 'quick-facts' }: { id?: string }) {
  return (
    <div className="overflow-x-auto rounded-[32px] bg-[var(--tint)] p-2 sm:p-3">
      <table id={id} className="w-full min-w-[520px] border-collapse text-left">
        <caption className="sr-only">TinyLearn quick facts</caption>
        <tbody>
          {quickFacts.map((f, i) => (
            <tr key={f.label} className={i % 2 ? undefined : 'bg-[var(--surface)]'}>
              <th
                scope="row"
                className="w-[34%] rounded-l-2xl px-5 py-3.5 align-top text-sm font-bold text-[var(--ink)]"
              >
                {f.label}
              </th>
              <td className="rounded-r-2xl px-5 py-3.5 align-top text-sm text-[var(--ink-soft)]">{f.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
