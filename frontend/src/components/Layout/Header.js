import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { Layout, Dropdown, Menu } from "antd";
import { FaRegHeart, FaUser } from "react-icons/fa";
import { IoMdClose, IoMdSearch } from "react-icons/io";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";

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

  // Use useLocation to check the current page
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Handle scroll to change header background and hide banner
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

    // Add scroll event listener only on the home page
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
    }, 3000); // Change message every 3 seconds

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <Layout className="!bg-transparent">
      {/* Banner Only on Home Page */}
      {isBannerVisible && isHomePage && (
        <div className="w-full bg-red-950 text-white py-1 text-center fixed top-0 left-0 z-50 transition-all duration-500 font-mono">
          <p className="animate-pulse mt-2 text-base">{messages[currentIndex]}</p>
        </div>
      )}

      {/* Main Navbar with Scroll Feature Only on Home Page */}
      <nav
        className={`font-medium text-black h-20 fixed w-full z-40 transition-all duration-300 ${isScrolled || !isHomePage ? "bg-white  top-0 flex justify-center items-center" : "bg-transparent top-[40px]"}`}
      >
        <div className="container mx-auto px-4 md:px-24">
          <div className="flex justify-between items-center py-2">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/">
                <img
                  src="../logo/logomk.png"
                  alt="Brand-logo"
                  className="h-20 md:h-24 lg:h-16 w-auto mt-2"
                />
              </Link>
            </div>

            {/* Navbar Links */}
            <div className="flex-grow flex justify-start ">
              <div className="hidden md:flex space-x-8 ml-16 items-center">
                <Link to="/" className={`md:text-lg font-sans ${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>Home</Link>
                <Link to="/store" className={`md:text-lg font-sans ${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>Products</Link>
                <Dropdown overlay={categoryMenu} trigger={["click"]}>
                  <Link className={`md:text-lg cursor-pointer font-sans ${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>Category</Link>
                </Dropdown>
                <Link to="/" className={`md:text-lg font-sans ${isScrolled || !isHomePage ? "text-black" : "text-white"}`}>Our Stories</Link>
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-6">
              <IoMdSearch className={`font-serif cursor-pointer text-white px-2 py-2 ${isScrolled || !isHomePage ? "text-white bg-black rounded-lg border border-gray-200 text-4xl" : "text-white text-5xl"}`} />
              {!auth.user ? (
                <Link
                  to="/login"
                  className="p-2 rounded-full "
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <FaUser className="text-2xl text-white" />
                </Link>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`text-xl font-serif text-white px-2 hover:bg-black py-2 rounded-lg border border-gray-200 ${isScrolled || !isHomePage ? "text-white bg-black" : "text-white"}`}
                  >
                    <FaUser className="text-xl" /> {/* Showing FaUser icon */}
                  </button>
                  {isDropdownOpen && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 border border-gray-300">
                      <li>
                        <Link
                          className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center"
                          to={`/dashboard/${auth.user.role === 1 ? "admin" : "user"}`}
                        >
                          Dashboard
                        </Link>
                      </li>
                      <li>
                        <button
                          className="w-full px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center hover:text-underline"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
              )}
              {auth.user?.role !== 1 && (
                <button className={`text-xl font-serif text-white px-2 hover:bg-black py-2 rounded-lg border border-gray-200 ${isScrolled || !isHomePage ? "text-white bg-black" : "text-white"}`}>
                  <Link to="/cart">
                    <FaRegHeart className="text-xl text-white" />
                  </Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-900 text-white absolute top-0 left-0 w-full p-5">
          {/* Close button */}
          <div className="flex justify-end">
            <button className="text-white" onClick={() => setIsMenuOpen(false)}>
              <IoMdClose className="h-6 w-6" />
            </button>
          </div>
          {/* Navbar Links for Small Screens */}
          <div className="flex flex-col items-start space-y-4">
            <Link to="/" className="text-xl" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/" className="text-xl" onClick={() => setIsMenuOpen(false)}>
              Product Category
            </Link>
            <Link to="/" className="text-xl" onClick={() => setIsMenuOpen(false)}>
              Our Stories
            </Link>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Header;
