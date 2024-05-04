import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/content";
import styles from "./postStyles.module.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
	const posts = await getPostSlugs();

	return posts.dirContent.map((post) => ({
		slug: post,
	}));
}

export default async function Post({ params }: Params) {
	const posts = await getPostSlugs();
	const post = await getPostBySlug(
		`${params.slug}.${posts.extMap.get(params.slug)}`,
	);

	return (
		<main className="space-y-5">
			<Button variant="ghost" className="-translate-x-3 group mb-3" asChild>
				<Link href="/content/notice" className="flex gap-2">
					<div className="translate-x-0 group-hover:-translate-x-1 transition-all">
						<MoveLeft />
					</div>{" "}
					返回
				</Link>
			</Button>
			<h1 className="text-4xl font-semibold">{post.title}</h1>
			<div
				// biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
				dangerouslySetInnerHTML={{ __html: post.html }}
				className={styles.markdown}
			/>
		</main>
	);
}

type Params = {
	params: {
		slug: string;
	};
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const posts = await getPostSlugs();
	const post = await getPostBySlug(
		`${params.slug}.${posts.extMap.get(params.slug)}`,
	);

	if (!post) {
		return notFound();
	}

	const title = `${post.title} | 南京邮电大学开源软件镜像站`;

	return {
		title,
		openGraph: {
			title,
		},
	};
}
