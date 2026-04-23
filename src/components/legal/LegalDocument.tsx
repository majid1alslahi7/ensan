type LegalSection = {
  title: string;
  points: string[];
};

type LegalDocumentProps = {
  title: string;
  description: string;
  updatedAt: string;
  sections: LegalSection[];
  notice: string;
};

export default function LegalDocument({
  title,
  description,
  updatedAt,
  sections,
  notice,
}: LegalDocumentProps) {
  return (
    <div className="pt-navbar bg-gray-50 dark:bg-gray-950 min-h-screen">
      <section className="bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white">
        <div className="container-page py-16 md:py-20">
          <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold mb-5">
            آخر تحديث: {updatedAt}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-5">{title}</h1>
          <p className="max-w-3xl text-lg leading-8 text-white/90">{description}</p>
        </div>
      </section>

      <section className="section-py">
        <div className="container-page max-w-5xl space-y-6">
          <div className="rounded-3xl border border-primary-100 dark:border-primary-900/40 bg-primary-50 dark:bg-primary-900/10 p-6 text-primary-900 dark:text-primary-100 leading-8">
            {notice}
          </div>

          {sections.map((section) => (
            <article key={section.title} className="rounded-3xl bg-white dark:bg-gray-900 shadow-lg border border-gray-100 dark:border-gray-800 p-7 md:p-8">
              <h2 className="text-2xl font-bold mb-5">{section.title}</h2>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300 leading-8">
                {section.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-3 h-2 w-2 shrink-0 rounded-full bg-primary-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
