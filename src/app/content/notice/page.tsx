import { getAllPosts } from "@/lib/content";
import { Signpost } from "lucide-react";
import Link from "next/link";

export default async function Home() {
	const post = await getAllPosts();
	return (
		<main>
			<div className="text-lg font-bold flex gap-1 items-center pb-4">
				<Signpost /> 站点公告
			</div>
			<div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
				{post.map((value, index) => {
					return (
						<Link
							href={`/content/notice/${value.slug}`}
							key={`postlist-${value.slug}`}
							className="border-[1px] rounded-lg border-gray-200 border-solid p-4 flex justify-between flex-col hover:shadow-sm hover:border-gray-400 transition-all duration-200 ease-in-out space-y-2"
						>
							<div className="space-y-1">
								<div className="text-sm text-blue-600">{value.category}</div>
								<div className="text-lg font-semibold line-clamp-1">
									{value.title}
								</div>
								<div className="text-sm text-gray-400 line-clamp-2">
									{value.description}
								</div>
							</div>
							<div className="text-sm text-gray-400 text-right">
								<span className="text-gray-400">{value.author}</span>{" "}
								{value.date}
							</div>
						</Link>
					);
				})}
			</div>
		</main>
	);
}
