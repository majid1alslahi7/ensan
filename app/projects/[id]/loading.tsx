export default function Loading() {
  return (
    <div className="pt-navbar container-page section-py">
      <div className="animate-pulse space-y-6">
        <div className="h-8 w-48 rounded-full bg-gray-200 dark:bg-gray-800" />
        <div className="h-12 w-3/4 rounded-2xl bg-gray-200 dark:bg-gray-800" />
        <div className="flex flex-wrap gap-3">
          <div className="h-8 w-32 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-8 w-32 rounded-full bg-gray-200 dark:bg-gray-800" />
          <div className="h-8 w-32 rounded-full bg-gray-200 dark:bg-gray-800" />
        </div>
        <div className="aspect-[16/9] rounded-3xl bg-gray-200 dark:bg-gray-800" />
        <div className="space-y-3">
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-800" />
          <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-800" />
        </div>
      </div>
    </div>
  );
}
