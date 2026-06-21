import { business } from "@/app/lib/content";

export default function QuickFacts() {
  const pills = [...business.serviceOptions, ...business.badges];

  return (
    <section className="border-y border-paper/10 bg-ink-deep">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex flex-wrap gap-3">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-paper/15 px-4 py-1.5 text-sm text-paper/85"
            >
              {pill}
            </span>
          ))}
        </div>

        <div className="flex flex-col gap-1 text-sm text-muted sm:items-end">
          <span className="font-medium text-paper">{business.hours}</span>
        </div>
      </div>
    </section>
  );
}
