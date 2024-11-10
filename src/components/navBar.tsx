import React from "react";
import AccountImg from "./accountImg";

const NavBar: React.FC = () => {
  return (
    <nav className=" bg-white bg-opacity-10 p-2 w-full">
      <ul className="flex justify-center flex-row items-center">
        <li className="m-2">
          <a href="/" className="text-white text-lg">
            Home
          </a>
        </li>
        <li className="m-2">
          <a href="/herNearby" className="text-white text-lg">
            Her Nearby
          </a>
        </li>
        <li className="m-2">
          <a href="/archive" className="text-white text-lg">
            Archive
          </a>
        </li>

        <li className="h-10">
          <AccountImg />
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
