import React from "react";
import Link from "next/link";
import AccountImg from "./accountImg";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white bg-opacity-10 p-2 w-full">
      <ul className="flex justify-center flex-row items-center">
        <li className="m-2">
          <Link href="/" passHref>
            <a className="text-white text-lg">Home</a>
          </Link>
        </li>
        <li className="m-2">
          <Link href="/herNearby" passHref>
            <a className="text-white text-lg">Her Nearby</a>
          </Link>
        </li>
        <li className="m-2">
          <Link href="/archive" passHref>
            <a className="text-white text-lg">Archive</a>
          </Link>
        </li>
        <li className="h-10">
          <AccountImg />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
