import React from 'react';

export const LoadingSkeleton = ({ width = 'w-full', height = 'h-6', className = '' }) => {
  return (
    <div className={`${width} ${height} bg-gray-300 rounded animate-pulse ${className}`} />
  );
};

export const PropertyCardSkeleton = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg overflow-hidden">
      <LoadingSkeleton height="h-40" className="w-full" />
      <div className="p-4">
        <LoadingSkeleton height="h-6" className="mb-2" />
        <LoadingSkeleton height="h-4" width="w-2/3" className="mb-3" />
        <LoadingSkeleton height="h-4" width="w-1/2" />
      </div>
    </div>
  );
};

export const ListCardSkeleton = () => {
  return (
    <div className="flex gap-4 bg-white border border-gray-300 rounded-lg overflow-hidden p-4">
      <LoadingSkeleton width="w-64" height="h-48" />
      <div className="flex-1">
        <LoadingSkeleton height="h-6" className="mb-2" />
        <LoadingSkeleton height="h-4" className="mb-4 w-2/3" />
        <LoadingSkeleton height="h-4" className="mb-2 w-1/2" />
        <LoadingSkeleton height="h-4" className="mb-4 w-1/3" />
      </div>
    </div>
  );
};
