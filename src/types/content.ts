export type Post = {
  slug: string;
  title: string;
  date: string;
  author: string;
  description: string;
  html: string;
  links: string[];
  category: string;
  mirrorId?: string;
};
