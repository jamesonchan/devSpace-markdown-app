import { NextPage } from "next";
import Link from "next/link";
import React, { ReactNode } from "react";

const CategoryLabel: NextPage<{ category: string }> = ({
  children,
  category,
}) => {
  const colorKey: { [key: string]: string } = {
    JavaScript: "bg-yellow-600",
    CSS: "bg-blue-600",
    Python: "bg-green-600",
    PHP: "bg-purple-600",
    Ruby: "bg-red-600",
  };

  return (
    <div
      className={`px-2 py-1  text-gray-100 font-bold rounded ${colorKey[category]}`}
    >
      <Link href={`/blog/category/${category.toLowerCase()}`}>{children}</Link>
    </div>
  );
};

export default CategoryLabel;
