import { getAllPosts } from "@/lib/content";
import Link from "next/link";

export default async function Home() {
  const post = await getAllPosts();
  console.log(post);
  return (
    <main className="w-full">
      {post.map((value) => {
        return (
          <div>
            <Link href={`/content/notice/${value.slug}`}>{value.title}</Link>
          </div>
        );
      })}
    </main>
  );
}
