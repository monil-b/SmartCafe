import { Skeleton } from "@/components/ui/skeleton";

const MenuSkeleton = () => {
  return (
    <div className="space-y-4 rounded-lg border bg-white p-5">
      
      <Skeleton className="h-52 w-full rounded-lg" />

      <Skeleton className="h-6 w-40" />

      <Skeleton className="h-4 w-full" />

      <Skeleton className="h-10 w-full" />

    </div>
  );
};

export default MenuSkeleton;