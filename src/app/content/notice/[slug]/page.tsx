import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/content";
import styles from "./postStyles.module.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const posts = getPostSlugs();
  console.log(posts);

  return posts.map((post) => ({
    slug: post,
  }));
}

export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug + ".mdx");

  console.log(params);
  return (
    <main>
      <h1 className="text-4xl font-semibold">{post.title}</h1>
      <div
        dangerouslySetInnerHTML={{ __html: post.html }}
        className={styles["markdown"]}
      ></div>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug + ".mdx");

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
