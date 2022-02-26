import { NextPage } from "next";
import Link from "next/link";
import React from "react";
import { Pages } from "..";

const Pagination: NextPage<Pages> = ({ currentPage, numPages }) => {
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage = `/blog/page/${currentPage - 1}`;
  const nextPage = `/blog/page/${currentPage + 1}`;

  if (numPages === 1) {
    return <></>;
  }

  return (
    <div className="mt-6">
      <ul className="flex pl-0 list-none my-2">
        {!isFirst && (
          <Link href={prevPage} passHref>
            <li className="pageLink">Previous</li>
          </Link>
        )}

        {Array.from({ length: numPages }, (_, i) => (
          <Link href={`/blog/page/${i + 1}`} passHref>
            <li className="pageLink">{i + 1}</li>
          </Link>
        ))}

        {!isLast && (
          <Link href={nextPage} passHref>
            <li className="pageLink">Next</li>
          </Link>
        )}
      </ul>
    </div>
  );
};

export default Pagination;
