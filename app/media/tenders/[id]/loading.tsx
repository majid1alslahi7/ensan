export default function Loading() {
  return (
    <div className="pt-navbar container-page section-py">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-12 w-2/3 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-8 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="h-96 rounded-3xl bg-gray-200 dark:bg-gray-800" />
      </div>
    </div>
  );
}
