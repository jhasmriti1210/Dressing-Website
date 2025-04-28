import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Layout, Dropdown, Menu } from "antd";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import { HiMenu } from "react-icons/hi"; // Hamburger Icon

const Header = () => {
  const navigate = useNavigate();
  const [cart] = useCart();
  const [auth, setAuth] = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
        setIsBannerVisible(false);
      } else {
        setIsScrolled(false);
        setIsBannerVisible(true);
      }
    };
    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
    }
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const categoryMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => navigate(`/category/pooh`)}>Pooh</Menu.Item>
      <Menu.Item key="2" onClick={() => navigate(`/category/naina`)}>Naina</Menu.Item>
      <Menu.Item key="3" onClick={() => navigate(`/category/geet`)}>Geet</Menu.Item>
      <Menu.Item key="4" onClick={() => navigate(`/category/aisha`)}>Aisha</Menu.Item>
    </Menu>
  );

  const messages = [
    "Special Offer! Free shipping on orders over $50.",
    "Limited Time! 20% off on all electronics.",
    "New Arrivals! Check out the latest collection.",
    "Holiday Sale! Up to 40% off sitewide."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === messages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <Layout className="!bg-transparent">
      {/* Banner */}
      {isBannerVisible && isHomePage && (
        <div className="w-full bg-red-950 text-white py-1 text-center fixed top-0 left-0 z-50 transition-all duration-500 font-mono">
          <p className="animate-pulse mt-1 text-sm md:text-base px-2">{messages[currentIndex]}</p>
        </div>
      )}

      {/* Navbar */}
      <nav
        className={`font-medium text-white h-20 fixed w-full z-40 transition-all duration-300 ${isScrolled || !isHomePage ? "bg-black top-0" : "bg-transparent top-8 md:top-10"
          }`}
      >
        <div className="container mx-auto px-4 md:px-24">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="../logo/logom.png"
                  alt="Brand-logo"
                  className="h-16 md:h-20 w-auto"
                />
              </Link>
            </div>

            {/* Navbar Links */}
            <div className="hidden md:flex space-x-8 ml-10 items-center">
              <Link to="/" className="md:text-lg font-sans text-white">Home</Link>
              <Link to="/store" className="md:text-lg font-sans text-white">Products</Link>
              <Dropdown overlay={categoryMenu} trigger={["click"]}>
                <Link className="md:text-lg cursor-pointer font-sans text-white">Category</Link>
              </Dropdown>
              <Link to="/" className="md:text-lg font-sans text-white">Our Stories</Link>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-5 md:space-x-6">
              {/* Search Icon */}
              <IoMdSearch className="cursor-pointer text-white p-2 text-3xl md:text-4xl border border-gray-200 rounded-lg bg-black" />

              {/* User Icon or Dropdown */}
              {!auth.user ? (
                <Link
                  to="/login"
                  className="p-2 rounded-full"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <FaUser className="text-2xl text-white" />
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="text-xl text-white p-2 border border-gray-200 rounded-lg bg-black"
                  >
                    <FaUser className="text-xl" />
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-300">
                      <li>
                        <Link
                          to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )}

              {/* Cart Icon */}
              {auth.user?.role !== 1 && (
                <Link to="/cart">
                  <FaRegHeart className="text-2xl text-white" />
                </Link>
              )}

              {/* Hamburger Icon */}
              <button
                className="md:hidden focus:outline-none"
                onClick={() => setIsMenuOpen(true)}
              >
                <HiMenu className="h-8 w-8 text-white" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white absolute top-0 left-0 w-full h-auto p-5 z-50">
          {/* Close Button */}
          <div className="flex justify-end">
            <button onClick={() => setIsMenuOpen(false)}>
              <IoMdClose className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col items-start space-y-8 mt-10 text-xl">
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/store" onClick={() => setIsMenuOpen(false)}>Products</Link>
            <Link to="/" onClick={() => setIsMenuOpen(false)}>Our Stories</Link>
            <Dropdown overlay={categoryMenu} trigger={["click"]}>
              <Link to="#" onClick={() => setIsMenuOpen(false)}>Categories</Link>
            </Dropdown>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Header;
