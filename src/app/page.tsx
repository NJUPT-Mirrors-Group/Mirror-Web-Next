import MirrorTable from "@/components/MirrorTable";
import { Box } from "lucide-react";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="w-full">
      <div className=" mx-auto max-w-7xl p-6 w-full">
        <div className="text-lg font-bold flex gap-1 items-center pb-4">
          <Box /> 镜像列表
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <MirrorTable />
        </Suspense>
      </div>
    </main>
  );
}
