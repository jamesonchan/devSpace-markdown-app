import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="bg-gray-900 text-gray-100 shadow w-full">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link href="/">
          <a className="flex md:w-1/5 title-font font-medium items-center md:justify-start mb-4 md:mb-0">
            <Image src="/images/logo.png" width={40} height={40} alt="logo" />
            <span className="ml-3 text-xl">DevSpace</span>
          </a>
        </Link>
        <nav className="flex flex-wrap md:w-4/5 items-center justify-end text-base md:ml-auto">
          <Link href={`/blog`}>
            <a className="link">Blog</a>
          </Link>
          <Link href={`/blog`}>
            <a className="link">About</a>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
