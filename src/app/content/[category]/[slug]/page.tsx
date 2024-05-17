import { getAllPosts, getPostBySlug, getAllPostSlugs } from "@/lib/content";
import styles from "./postStyles.module.css";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GoBack } from "@/components/GoBack";

export async function generateStaticParams() {
	const posts = await getAllPostSlugs();

	return posts.dirContent.map((post) => ({
		slug: post,
	}));
}

export default async function Post({ params }: Params) {
	const posts = await getAllPostSlugs();
	const postName = `${params.category}/${params.slug}.${posts.extMap.get(params.category + "/" + params.slug)}`;
	const post = await getPostBySlug(postName);

	return (
		<main className="space-y-5">
			<GoBack />
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
		category: string;
	};
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
	const posts = await getAllPostSlugs();
	const postName = `${params.category}/${params.slug}.${posts.extMap.get(params.category + "/" + params.slug)}`;
	const post = await getPostBySlug(postName);

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
