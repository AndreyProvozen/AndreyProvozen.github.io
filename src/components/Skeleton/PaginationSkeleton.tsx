import type { FC } from 'react';

const PaginationSkeleton: FC = () => (
  <div className="flex justify-center my-5 px-5">
    <div className="w-20 h-8 bg-gray animate-pulse rounded-md" />
    <div className="w-28 h-8 bg-gray mx-5 animate-pulse rounded-md" />
    <div className="w-20 h-8 bg-gray animate-pulse rounded-md" />
  </div>
);

export default PaginationSkeleton;
