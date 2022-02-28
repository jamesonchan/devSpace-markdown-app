import { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { LayoutProps } from "..";
import Header from "./Header";
import Search from "./Search";

const Layout: NextPage<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
}) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Search />

      <main className="container mx-auto my-7">{children}</main>
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Welcome to DevSapce",
  keywords: "development, coding, programming",
  description: "The best info in development",
};
