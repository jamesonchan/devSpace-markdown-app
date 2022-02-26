import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { GetStaticProps, NextPage } from "next";
import Layout from "../../components/Layout";
import { FrontmatterProps } from "../..";
import Link from "next/link";
import CategoryLabel from "../../components/CategoryLabel";
import { marked } from "marked";

const PostPage: NextPage<{
  frontmatter: FrontmatterProps;
  content: any;
  slug: string;
}> = ({ frontmatter, content, slug }) => {
  return (
    <Layout title={frontmatter.title}>
      <Link href={`/blog`}>Go back</Link>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{frontmatter.title}</h1>
          <CategoryLabel category={frontmatter.category}>
            {frontmatter.category}
          </CategoryLabel>
        </div>
        <img
          src={frontmatter.cover_image}
          alt="blog image"
          className="w-full rounded"
        />
        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <img
              src={frontmatter.author_image}
              alt="author image"
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
            />
            <h4>{frontmatter.author}</h4>
          </div>
          <div className="mr-4">{frontmatter.date}</div>
        </div>

        <div className="blog-text mt-2">
          <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;

export const getStaticPaths = async () => {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", `${context.params?.slug}.md`),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug: context.params?.slug,
    },
  };
};
