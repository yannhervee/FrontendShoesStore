import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faShoppingCart
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const NavBar = () => {
  // State to manage the expansion of each criterion
  const [expanded, setExpanded] = useState({
    size: false,
    gender: false,
    priceRange: false,
  });

  return (
    <header className="bg-gray-800 text-white">
      {/* First Navigation Bar */}
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Left Section */}
        <div className="flex items-center">
          {/* Website Name */}
          <div className="text-2xl font-bold">
            <Link href="/">
              <span className="text-white">Store Name</span>
            </Link>
          </div>

          
          <div className="ml-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-2 py-1 rounded border-none focus:outline-none text-black"
            />
          </div>
        </div>

        {/* Right Section (Sign In and Bag) */}
        <div className="flex items-center">
          {/* User Sign In */}
          <div className="mr-4">
            <Link href="#" className="hover:underline">
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              <span>Sign In</span>
            </Link>
          </div>

          {/* Shopping Cart */}
          <div>
            <Link href="/notificationview">
              <span className="flex items-center hover:underline">
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="text-2xl mr-2"
                />
                <span>Bag</span>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Second Navigation Bar */}
      <nav className="bg-gray-700 text-white">
        <div className="container mx-auto flex justify-center p-2">
          {/* Category Links */}
          <div className="mx-4">
            <a className="hover:underline">Heels</a>
          </div>
          <div className="mx-4">
            <a className="hover:underline">Sneakers</a>
          </div>
          <div className="mx-4">
            <a className="hover:underline">Boots</a>
          </div>
          <div className="mx-4">
            <a className="hover:underline">Sandals</a>
          </div>
          <div className="mx-4">
            <a className="hover:underline">Flats</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
