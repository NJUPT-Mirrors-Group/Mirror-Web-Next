import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { compile } from "@rspress/mdx-rs";

const postsDirectory = join(process.cwd(), "content");
export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(filename) {
  const fullPath = join(postsDirectory, filename);
  const realSlug = filename.replace(/\.mdx?$/, "");
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
  const frontMatterInfo = JSON.parse(result.frontmatter);

  return { links: result.links, html: result.html, ...frontMatterInfo };
}
getPostBySlug("test.mdx");

// export function getAllPosts(): Post[] {
//   const slugs = getPostSlugs();
//   const posts = slugs
//     .map((slug) => getPostBySlug(slug))
//     // sort posts by date in descending order
//     .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
//   return posts;
// }

// export default async function markdownToHtml(markdown: string) {
//   const result = await remark().use(html).process(markdown);
//   return result.toString();
// }
