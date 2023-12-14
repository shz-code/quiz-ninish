import React from "react";
import { Link } from "react-router-dom";
import Logo from "../images/logo.png";

export default function Navbar() {
  return (
    // <!-- Header Section Start -->
    <header className="header w-full border-b pb-4 bg-white">
      {/* <!-- Header containerNinish --> */}
      <div className="containerNinish mx-auto px-2 sm:flex justify-center items-center">
        {/* <!-- Brand Logo --> */}
        <Link to="/">
          <div className="logo mx-auto sm:mx-0 mt-2">
            <img src={Logo} alt="Ninish Logo" />
          </div>
        </Link>
      </div>
    </header>
    // <!-- Header Section End -->
  );
}
