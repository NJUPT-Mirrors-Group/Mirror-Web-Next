import Aside, { AsideSkeleton } from "@/components/Iso/Aside";
import { Suspense } from "react";

const DownloadAsidePage = ({ params }: { params: { distro: string } }) => {
  return (
    <Suspense fallback={<AsideSkeleton />}>
      <Aside distro={params["distro"]} />
    </Suspense>
  );
};
export default DownloadAsidePage;
