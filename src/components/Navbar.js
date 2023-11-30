import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MainContext from "../contextApi/MainContext";
import Logo from "../images/logo.png";

export default function Navbar() {
  const mainContext = useContext(MainContext);
  const { user, logout } = mainContext;

  const handleClick = () => {
    logout();
  };
  return (
    // <!-- Header Section Start -->
    <header className="header w-full border-b pb-4 bg-white">
      {/* <!-- Header containerNinish --> */}
      <div className="containerNinish mx-auto px-2 sm:flex justify-between items-center">
        {/* <!-- Brand Logo --> */}
        <Link to="/">
          <div className="logo mx-auto sm:mx-0 mt-2">
            <img src={Logo} alt="Ninish Logo" />
          </div>
        </Link>
        {/* <!-- Navigation Links For Desktop --> */}
        <nav className="desktopNavLinks">
          <ul className="flex gap-2 items-center justify-center sm:justify-start mt-4">
            <li>
              <a href="https://ninish.com" target="_blank" rel="noreferrer">
                হোম
              </a>
            </li>
            <li>
              <a
                href="https://account.ninish.com"
                target="_blank"
                rel="noreferrer"
              >
                ড্যাশবোর্ড
              </a>
            </li>
            <li>
              {user && (
                <button
                  onClick={handleClick}
                  className="bg-gradient-to-tr from-violet-700 to-indigo-800 text-white font-bold py-2 px-5 rounded-full"
                >
                  লগ আউট
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
    // <!-- Header Section End -->
  );
}
