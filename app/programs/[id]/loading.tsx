export default function Loading() {
  return (
    <div className="pt-navbar">
      <div className="animate-pulse">
        <div className="h-[360px] bg-gray-200 dark:bg-gray-800" />
        <div className="container-page section-py space-y-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-40 rounded-2xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 h-72 rounded-2xl bg-gray-200 dark:bg-gray-800" />
            <div className="h-72 rounded-2xl bg-gray-200 dark:bg-gray-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
