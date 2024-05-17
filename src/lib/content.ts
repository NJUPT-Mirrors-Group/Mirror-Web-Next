import { join } from "node:path";
import fs from "node:fs";
import type { Post } from "@/types/content";
import { compile } from "@rspress/mdx-rs";

const getAllCategories = async () => {
  const dirs = await fs.promises.readdir("content");
  return dirs;
};
export const getAllHelp = async () => {
  const dirs = await fs.promises.readdir("content/help");
  return dirs.flat().map((value) => value.replace(/.mdx?$/, ""));
};

// TODO: 暂时先写死，因为只有一种文章类型，后面做通用的博客系统再优化一下路由设计
const postsDirectory = join(process.cwd(), "content/");

const generateExtMap = (dirList: string[]) => {
  // TODO: 这边可能之后要做一个 cache 的性能优化,暂时还没有特别好的想法
  const extMap = new Map<string, string>();
  for (const file of dirList) {
    const ext = file.split(".") as string[];
    extMap.set(ext[0], ext[1]);
  }
  return extMap;
};

/**
 * 获取所有文章的文件
 * @returns 所有文章的文件名
 */
export async function getAllPostSlugs() {
  const categories = await getAllCategories();
  const dirContent = await Promise.all(
    categories.map(async (category) => {
      const files = await fs.promises.readdir(`content/${category}`);
      return files.map((file) => `${category}/${file}`);
    }),
  );
  const extMap = generateExtMap(dirContent.flat());
  return {
    dirContent: dirContent.flat().map((value) => value.replace(/.mdx?$/, "")),
    extMap,
  };
}

/**
 * 获取指定分类的文章路由
 * @param category 分类
 * @returns
 */
export async function getPostSlugsByCategory(category: string) {
  const files = await fs.promises.readdir(`content/${category}`);
  const dirContent = files.map((file) => `${category}/${file}`);
  const extMap = generateExtMap(dirContent);
  return {
    dirContent: dirContent.map((value) => value.replace(/.mdx?$/, "")),
    extMap,
  };
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

  // INFO: 如果有指定category，就用指定的，否则用文件夹名
  return {
    links: result.links,
    html: result.html,
    ...frontMatterInfo,
    category: frontMatterInfo.category || filename.split("/")[0],
  } as Post;
}

/**
 * 获取所有文章信息
 * @returns
 */
export async function getAllPosts(): Promise<Post[]> {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.dirContent.map(
      async (slug) => await getPostBySlug(`${slug}.${slugs.extMap.get(slug)}`),
    ),
  );
  // sort posts by date in descending order
  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sortedPosts;
}

/**
 * 获取指定分类的文章
 * @param category 分类
 * @returns
 */
export async function getPostsByCategory(category: string): Promise<Post[]> {
  const slugs = await getPostSlugsByCategory(category);
  const posts = await Promise.all(
    slugs.dirContent.map(
      async (slug) => await getPostBySlug(`${slug}.${slugs.extMap.get(slug)}`),
    ),
  );
  // sort posts by date in descending order
  const sortedPosts = posts.sort((a, b) => (a.date > b.date ? -1 : 1));
  return sortedPosts;
}
