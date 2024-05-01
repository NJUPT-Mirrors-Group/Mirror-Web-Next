import MirrorTable, { SkeletonTable } from "@/components/MirrorTable";
import { Skeleton } from "@/components/ui/skeleton";
import { Box } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full">
      <div className=" mx-auto max-w-7xl p-6 w-full">
        <div className="text-lg font-bold flex gap-1 items-center pb-4">
          <Box /> 镜像列表
        </div>
        <Suspense fallback={<SkeletonTable />}>
          <MirrorTable />
        </Suspense>
      </div>
    </main>
  );
}
