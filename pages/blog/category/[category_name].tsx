import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import path from "path";
import fs from "fs";
import { PostsProps } from "../../..";
import Layout from "../../../components/Layout";
import Post from "../../../components/Post";
import { sortByDate } from "../../../util/sortByDate";
import { getPosts } from "../../../lib/posts";
import CategoryList from "../../../components/CategoryList";

const CategoryPage: NextPage<{
  posts: PostsProps[];
  categories: string[];
  categoryName: string;
}> = ({ posts, categories, categoryName }) => {
  return (
    <Layout title="Home">
      <div className="flex justify-between">
        <div className="w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5">Posts in {categoryName}</h1>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post}/>
            ))}
          </div>
        </div>
        <div className="w-1/4">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const categories = files.map((filename) => {
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: {
      category_name: category,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const posts = getPosts();
  //filter posts by category
  const categoryPosts = posts.filter(
    (post) =>
      post.frontmatter.category.toLowerCase() === context.params?.category_name
  );

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...(new Set(categories) as any)];

  return {
    props: {
      posts: categoryPosts.sort(sortByDate),
      categoryName: context.params?.category_name,
      categories: uniqueCategories,
    },
  };
};
