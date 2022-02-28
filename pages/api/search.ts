// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PostsProps } from "../..";
import { getPosts } from "../../lib/posts";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  let posts;
  if (process.env.NODE_ENV === "production") {
    // fetch from cache
    posts = require("../../cache/data").posts;
  } else {
    posts = getPosts();
  }

  const results = posts?.filter(
    ({ frontmatter: { title, excerpt, category } }: any) =>
      title.toLowerCase().indexOf(req.query.q) != -1 ||
      excerpt.toLowerCase().indexOf(req.query.q) != -1 ||
      category.toLowerCase().indexOf(req.query.q) != -1
  );

  res.status(200).json(results);
}
