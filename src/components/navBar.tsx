import React from "react";
import Link from "next/link";
import AccountImg from "./accountImg";

const NavBar: React.FC = () => {
  return (
    <nav className="bg-white bg-opacity-10 p-2 w-full">
      <ul className="flex justify-center flex-row items-center">
        <li className="m-2">
          <Link href="/" passHref>
            <div className="text-white text-lg">Home</div>
          </Link>
        </li>
        <li className="m-2">
          <Link href="/herNearby" passHref>
            <div className="text-white text-lg">Her Nearby</div>
          </Link>
        </li>
        <li className="m-2">
          <Link href="/archive" passHref>
            <div className="text-white text-lg">Archive</div>
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
