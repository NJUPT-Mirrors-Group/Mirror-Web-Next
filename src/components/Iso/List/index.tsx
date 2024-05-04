import { Badge } from "@/components/ui/badge";
import { getIsoByDistro } from "..";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Download, DownloadCloud } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function List({ distro }: { distro: string }) {
	const isoData = await getIsoByDistro(distro);
	return (
		<div className="col-span-7 px-8 ">
			<div className="text-lg font-bold">{distro}</div>
			<div className="mt-2">
				{isoData ? (
					<>
						<ul className="flex flex-col gap-2 w-full">
							{isoData.urls.map((iso, index) => (
								<li key={`iso${iso.name}${index}`}>
									<div className="border-[1px] rounded-lg border-gray-200 border-solid p-4 flex justify-between items-center hover:shadow-sm hover:border-blue-400 transition-all duration-200 ease-in-out">
										<div>
											<h3 className="text-base font-semibold">{iso.name}</h3>
											<div className="flex gap-2 mt-2">
												{iso.tag?.map((tag) => (
													<Badge key={tag} variant="secondary">
														{tag}
													</Badge>
												))}
											</div>
										</div>
										<Button asChild>
											<Link href={iso.url}>
												<DownloadCloud className="mr-2 w-4 h-4" />
												下载
											</Link>
										</Button>
									</div>
								</li>
							))}
						</ul>
					</>
				) : (
					<></>
				)}
			</div>
		</div>
	);
}

export const ListSkeleton = ({ distro }: { distro: string }) => {
	return (
		<div className="col-span-7 px-8 ">
			<div className="text-lg font-bold">{distro}</div>
			<div className="mt-2">
				<ul className="flex flex-col gap-2 w-full">
					{Array.from({ length: 5 }).map((_, index) => (
						<li
							key={`loading${
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								index
							}`}
						>
							<div className="border-[1px] rounded-lg border-gray-200 border-solid p-4 flex justify-between items-center">
								<div>
									<h3 className="text-base font-semibold">
										<Skeleton
											className={" h-6 rounded"}
											style={{
												width: `${Math.random() * 100 + 100}px`,
											}}
										/>
									</h3>
									<div className="flex gap-2 mt-2">
										<Skeleton className="w-20 h-5 rounded-full" />
										<Skeleton className="w-20 h-5 rounded-full" />
									</div>
								</div>
								<Skeleton className="w-20 h-10 rounded" />
							</div>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
