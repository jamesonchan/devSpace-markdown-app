import fs from "fs";
import matter from "gray-matter";
import type { GetStaticProps, NextPage } from "next";
import path from "path";
import {  PostsProps } from "../../..";
import Layout from "../../../components/Layout";
import Pagination from "../../../components/Pagination";
import Post from "../../../components/Post";
import { POSTS_PER_PAGE } from "../../../config";
import { sortByDate } from "../../../util/sortByDate";

const BlogPage: NextPage<{
  posts: PostsProps[];
  numPages: number;
  currentPage: number;
}> = ({ posts, numPages, currentPage }) => {
  return (
    <Layout title="Home">
      <h1 className="text-5xl border-b-4 p-5">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Pagination currentPage={currentPage} numPages={numPages} />
    </Layout>
  );
};

export default BlogPage;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));
  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];
  for (let i = 1; i < numPages; i++) {
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
  const posts = files.map((filename) => {
    const slug = filename.replace(".md", "");
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );
    const { data: frontmatter } = matter(markdownWithMeta);
    return {
      slug,
      frontmatter,
    };
  });

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts
    .sort(sortByDate)
    .slice(pageIndex * POSTS_PER_PAGE, (pageIndex + 1) * POSTS_PER_PAGE);

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
    },
  };
};
