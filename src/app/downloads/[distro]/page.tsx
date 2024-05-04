import List, { ListSkeleton } from "@/components/Iso/List";
import { Suspense } from "react";

const DistroDownloadList = ({ params }: { params: { distro: string } }) => {
	return (
		<Suspense fallback={<ListSkeleton distro={params.distro} />}>
			<List distro={params.distro} />
		</Suspense>
	);
};
export default DistroDownloadList;
