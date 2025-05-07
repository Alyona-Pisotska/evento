import Skeleton from '@/components/skeleton';

function Loading() {
  return (
    <div className="flex flex-col items-center gap-y-4 pt-28">
      <Skeleton />
      <Skeleton className="w-[400px]" />
      <Skeleton className="w-[430px]" />
    </div>
  );
}

export default Loading;
