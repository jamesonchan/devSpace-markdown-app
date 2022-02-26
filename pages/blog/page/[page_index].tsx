import fs from "fs";
import type { GetStaticProps, NextPage } from "next";
import path from "path";
import { PostsProps } from "../../..";
import CategoryList from "../../../components/CategoryList";
import Layout from "../../../components/Layout";
import Pagination from "../../../components/Pagination";
import Post from "../../../components/Post";
import { POSTS_PER_PAGE } from "../../../config";
import { getPosts } from "../../../lib/posts";

const BlogPage: NextPage<{
  posts: PostsProps[];
  numPages: number;
  currentPage: number;
  categories: string[];
}> = ({ posts, numPages, currentPage, categories }) => {
  return (
    <Layout title="Home">
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5">Latest Posts</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default BlogPage;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = Number((params && params.page_index) || 1);
  const files = fs.readdirSync(path.join("posts"));
  const posts = getPosts();
  // get categories for sidebar
  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...(new Set(categories) as any)];
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
};
