export interface LayoutProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface FrontmatterProps {
  title: string;
  date: string;
  excerpt: string;
  cover_image: string;
  category: string;
  author: string;
  author_image: string;
}

export interface PostsProps {
  slug: string;
  frontmatter: FrontmatterProps;
}


export interface Pages {
  numPages: number;
  currentPage: number;
}
