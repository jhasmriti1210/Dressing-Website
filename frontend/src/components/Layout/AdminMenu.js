import { Layout } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-10 min-h-screen">
        <div className="bg-white shadow-lg rounded-lg p-4 max-w-md mx-auto">
          <h4 className="text-xl font-bold mb-4 text-center">Admin Panel</h4>
          <div className="flex flex-col space-y-2">
            <NavLink
              to="/dashboard/admin/create-category"
              className="block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200"
            >
              Create Category
            </NavLink>
            <NavLink
              to="/dashboard/admin/create-product"
              className="block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200"
            >
              Create Product
            </NavLink>
            <NavLink
              to="/dashboard/admin/products"
              className="block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200"
            >
              Products
            </NavLink>
            <NavLink
              to="/dashboard/admin/orders"
              className="block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200"
            >
              Orders
            </NavLink>
            <NavLink
              to="/dashboard/admin/users"
              className="block px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200"
            >
              Users
            </NavLink>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminMenu;
