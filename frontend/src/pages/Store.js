import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Dropdown, Menu } from "antd"; // Import Checkbox and Menu from antd
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

import useCategory from "../hooks/useCategory";

const Store = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPriceFilter, setShowPriceFilter] = useState(false);

  // For filtering price
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);

  const { categories, loading: categoriesLoading, error } = useCategory();

  const resetButtonStyles = {
    fontFamily: "serif",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: isHovered ? "black" : "white",
    backgroundColor: isHovered ? "#ffbf00" : "black",
    border: "none",
    padding: "8px 16px",
    borderRadius: "8px",
    marginTop: "12px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  };

  useEffect(() => {
    getTotal();
    getAllProducts();
  }, []);

  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      setAllProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts((prev) => [...prev, ...data.products]);
      setAllProducts((prev) => [...prev, ...data.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  const handleFilter = (value, id) => {
    const updatedChecked = value ? [...checked, id] : checked.filter((c) => c !== id);
    setChecked(updatedChecked);
  };

  // Filter products by price and other filters
  const filterProduct = async () => {
    if (checked.length || minPrice || maxPrice) {
      try {
        const { data } = await axios.post("/api/v1/product/product-filters", { checked, radio, minPrice, maxPrice });
        setProducts(data.products);
      } catch (error) {
        console.log(error);
      }
    } else {
      setProducts(allProducts);
    }
  };

  useEffect(() => {
    filterProduct();
  }, [checked, radio, minPrice, maxPrice]);

  const categoryMenu = (
    <Menu>
      {categories?.map((category) => (
        <Menu.Item key={category._id}>
          <Checkbox
            checked={checked.includes(category._id)}
            onChange={(e) => handleFilter(e.target.checked, category._id)}
          >
            {category.name}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  const resetFilters = () => {
    setChecked([]);
    setMinPrice(0);
    setMaxPrice(10000);
    setProducts(allProducts);
  };

  return (
    <Layout title="Store - Best Offers">
      <div className="p-4 md:p-8 bg-gray-50 min-h-screen mt-32 ml-6">
        <div className="flex flex-col gap-6">
          <h1 className=" text-5xl font-semibold text-gray-800 mb-8 font-mono ">Products</h1>
          {/* Filters on top */}
          <div className="flex justify-start items-center gap-6 mb-6">
            <h1 className="mt-2 text-gray-600">Filters:</h1>

            {/* Category Dropdown */}
            <div className="w-1/3 relative">
              <Dropdown overlay={categoryMenu} trigger={["click"]}>
                <a
                  href="#"
                  className={`text-lg cursor-pointer underline font-sans ${isHovered ? "text-black" : "text-gray-600"}`}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Category
                </a>
              </Dropdown>
            </div>

            {/* Price Filter Section */}
            <div className="w-1/3 relative flex items-center gap-4">
              <a
                href="#"
                className={`text-lg cursor-pointer underline font-sans ${isHovered ? "text-black" : "text-gray-600"}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => setShowPriceFilter(!showPriceFilter)}  // Toggle visibility of inputs on click
              >
                Price
              </a>

              {/* Display the price input fields when the price filter is toggled */}
              {showPriceFilter && (
                <div className="absolute mt-10 ml-12 p-4 bg-white border border-gray-300  w-64">
                  <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md mb-2"
                  />
                  <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                </div>
              )}
            </div>

            {/* Reset Filters Button */}
            <button

              style={resetButtonStyles}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={resetFilters}
            >
              RESET FILTERS
            </button>
            {/* Total Products Count */}
            <div className="text-lg font-medium ">
              <p className="mt-4 text-gray-600">{` ${products?.length} Products`}</p>
            </div>
          </div>


          {/* Main Content */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
              {products?.map((p) => (
                <div
                  key={p._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    className="h-56 w-full object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex-grow">
                      <h5 className="text-xl font-semibold mb-2">{p.name}</h5>
                      <p className="text-gray-600 text-sm mb-4">
                        {p.description.substring(0, 50)}...
                      </p>
                      <div className="flex flex-col gap-2">
                        <p className="text-sm font-bold text-black">
                          Online Payment: <span className='italic text-gray-600'>₹{p.price}</span>
                        </p>
                        <p className="text-sm font-bold text-black">
                          Cash on Delivery: <span className='italic text-gray-600'>₹{p.cashprice}</span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-semibold"
                      >
                        More Details
                      </button>
                      <button
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem("cart", JSON.stringify([...cart, p]));
                          toast.success("Item added to cart");
                        }}
                        className="bg-black hover:bg-yellow-500 text-white py-2 rounded-md text-sm font-semibold"
                      >
                        Add To Favourites
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {products.length > 0 && products.length < total && (
              <div className="text-center mt-10">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-8 rounded-lg"
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Store;
