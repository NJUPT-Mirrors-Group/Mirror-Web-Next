import { join } from "node:path";
import fs from "node:fs";
import type { Post } from "@/types/content";
import { compile } from "@rspress/mdx-rs";

// TODO: 暂时先写死，因为只有一种文章类型，后面做通用的博客系统再优化一下路由设计
const postsDirectory = join(process.cwd(), "content/notice");

/**
 * 获取所有文章的文件
 * @returns 所有文章的文件名
 */
export async function getPostSlugs() {
  const dirContent = await new Promise<string[]>((resolve, reject) => {
    fs.readdir(postsDirectory, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
  const extMap = new Map<string, string>();
  for (const file of dirContent) {
    const ext = file.split(".") as string[];
    extMap.set(ext[0], ext[1]);
  }
  return { dirContent: dirContent.map((value) => value.replace(/.mdx?$/, "")), extMap };
}

/**
 * 获取文章详细信息
 * @param filename 文件名（要带扩展）
 * @returns 
 */
export async function getPostBySlug(filename: string) {
  const fullPath = join(postsDirectory, `${filename}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const result = await compile({
    value: fileContents,
    filepath: fullPath,
    development: process.env.NODE_ENV === "development",
    root: "",
  });
  const frontMatterInfo = JSON.parse(result.frontmatter);

  return { links: result.links, html: result.html, ...frontMatterInfo } as Post;
}

/**
 * 获取所有文章信息
 * @returns 
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(
    slugs.dirContent.map(async (slug) => await getPostBySlug(`${slug}.${slugs.extMap.get(slug)}`)),
  );
  // sort posts by date in descending order
  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sortedPosts;
}
