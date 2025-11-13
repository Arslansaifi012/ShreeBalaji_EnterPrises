import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, setToken, setCartItems } =
    useContext(ShopContext);
  const navigate = useNavigate(); // Using useNavigate hook directly

  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken(null);
    setCartItems({});
  };

    const handleRedirect = () => {
    // पूरा URL दें (प्रोजेक्ट B का)
    window.location.href = 'https://forever-admin-lemon-beta.vercel.app';
  };

  return (
    <div className="flex items-center justify-between py-2 font-medium">
      <Link to="/">
        <img src={assets.SBE_Logo} className="w-40" alt="Logo" />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700">
        {["/", "/collection", "/about", "/contact"].map((path) => (
          <li key={path}>
            <NavLink
              to={path}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 ${
                  isActive ? "active-link" : ""
                }`
              }
              end
            >
              <p>{path === "/" ? "HOME" : path.slice(1).toUpperCase()}</p>
              <hr className="w-2/4 border-none h-[1.5px]  bg-gray-700 hidden" />
            </NavLink>
          </li>
        ))}
        <button className="cursor-pointer border border-gray-700 px-2 py-1 rounded-2xl" onClick={handleRedirect}>Admin Panel</button>
      </ul>

      {/* Icons Section */}
      <div className="flex items-center gap-6">
        <button onClick={() => setShowSearch(true)} className="cursor-pointer">
          <img src={assets.search_icon} className="w-5" alt="Search" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative group">
          <button
            onClick={() => (token ? null : navigate("/login"))}
            className="cursor-pointer"
          >
            <img src={assets.profile_icon} className="w-5" alt="Profile" />
          </button>
          {token && (
            <div className="hidden group-hover:block absolute right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-3 bg-slate-100 text-gray-500 rounded shadow-lg">
                <Link className="cursor-pointer hover:text-black">
                  My Profile
                </Link>
                <Link to="/orders" className="cursor-pointer hover:text-black">
                  Orders
                </Link>
                <button
                  onClick={handleLogout}
                  className="cursor-pointer hover:text-black text-left"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
          {getCartCount() > 0 && (
            <p className="absolute -right-2 -bottom-2 bg-red-500 w-4 h-4 text-white text-xs flex items-center justify-center rounded-full">
              {getCartCount()}
            </p>
          )}
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="w-5 cursor-pointer sm:hidden"
          onClick={() => setVisible(true)}
          aria-label="Open menu"
        >
          <img src={assets.menu_icon} alt="Menu" />
        </button>
      </div>

      {/* Mobile Sidebar Menu */}
      {visible && (
        <div
          className={`fixed top-0 right-0 bottom-0 z-50 bg-white transition-all duration-300 ease-in-out w-full`}
        >
          <div className="flex flex-col text-gray-600 h-full">
            <button
              onClick={() => setVisible(false)}
              className="flex cursor-pointer items-center gap-4 p-3"
              aria-label="Close menu"
            >
              <img
                className="h-4"
                src={assets.dropdown_icon}
                alt=""
                style={{ transform: "rotate(180deg)" }}
              />
              <p>Back</p>
            </button>

            {["/", "/collection", "/about", "/contact"].map((path) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-3 pl-6 border-b ${
                    isActive ? "text-black font-semibold" : ""
                  }`
                }
                end
              >
                {path === "/" ? "HOME" : path.slice(1).toUpperCase()}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
