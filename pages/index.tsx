import type { NextPage } from "next";
import Link from "next/link";
import { PostsProps } from "..";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { getPosts } from "../lib/posts";

const Home: NextPage<{ posts: PostsProps[] }> = ({ posts }) => {
  return (
    <Layout title="Home">
      <h1 className="text-5xl border-b-4 p-5">Latest Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
      <Link href="/blog">
        <a className="block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline focus:shadow-outline w-full">
          All Posts
        </a>
      </Link>
    </Layout>
  );
};

export default Home;

export const getStaticProps = async () => {
  return {
    props: {
      posts: getPosts().slice(0, 6),
    },
  };
};
