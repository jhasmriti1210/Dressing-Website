import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - All Products"}>
      <div
        className="min-h-screen pt-32 pb-10 px-4"
        style={{
          background: "linear-gradient(to right, #ffecd2, #fcb69f)",
          minHeight: "100vh",
        }}
      >
        <div className="container mx-auto flex flex-col lg:flex-row md:flex-row gap-8 ">
          {/* Left Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-32">
              <AdminMenu />
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-3/4 mt-32 bg-white rounded-xl ">
            <div className=" rounded-xl ">
              <h1 className="text-4xl font-bold text-center mb-8 text-black mt-12">
                All Products List
              </h1>

              <div className="flex flex-wrap justify-center gap-6">
                {products?.map((p) => (
                  <Link
                    key={p._id}
                    to={`/dashboard/admin/product/${p.slug}`}
                    className="block"
                  >
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-64">
                      <img
                        src={`/api/v1/product/product-photo/${p._id}`}
                        alt={p.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h5 className="text-lg font-semibold text-gray-800 mb-2">
                          {p.name}
                        </h5>
                        <p className="text-sm text-gray-600">
                          {p.description.length > 60
                            ? p.description.substring(0, 60) + "..."
                            : p.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
