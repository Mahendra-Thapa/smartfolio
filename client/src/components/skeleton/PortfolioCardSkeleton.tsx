import React from "react";
import { Skeleton } from "../ui/skeleton";

const PortfolioCardSkeleton = () => {
  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
      {/* Header Skeleton */}
      <div className="h-32 flex items-end p-6 bg-slate-100 dark:bg-slate-900">
        <div className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white dark:bg-slate-800 space-y-4">
        {/* Intro */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Metadata */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>

        {/* Buttons */}
        <div className="flex gap-2 flex-wrap">
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 flex-1 rounded-lg" />
          <Skeleton className="h-10 w-16 rounded-lg" />
          <Skeleton className="h-10 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default PortfolioCardSkeleton;
