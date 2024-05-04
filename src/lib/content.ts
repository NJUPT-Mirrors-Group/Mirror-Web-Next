import { join } from "path";
import fs from "fs";
import { Post } from "@/types/content";
import { compile } from "@rspress/mdx-rs";

const postsDirectory = join(process.cwd(), "content/notice");
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(filename: string) {
  const fullPath = join(postsDirectory, `${filename}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const result = await compile({
    // The mdx content
    value: fileContents,
    // File path of the mdx file, the compiler will determine the different syntax(md/mdx) based on the file extension
    filepath: fullPath,
    // Whether to enable development mode, default is false
    development: process.env.NODE_ENV === "development",
    // Current working directory, can be empty string
    root: "",
  });
  console.log(result);
  const frontMatterInfo = JSON.parse(result.frontmatter);
  console.log(frontMatterInfo);

  return { links: result.links, html: result.html, ...frontMatterInfo } as Post;
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => await getPostBySlug(slug)),
  );
  // sort posts by date in descending order
  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sortedPosts;
}
