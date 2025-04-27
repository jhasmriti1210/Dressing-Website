import { Layout } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="shadow-lg rounded-lg p-4 bg-white min-h-screen">
          <h4 className="text-2xl font-bold mb-6 text-center">Dashboard</h4>
          <div className="flex flex-col space-y-4">
            <NavLink
              to="/dashboard/user/profile"
              className="block px-4 py-3 rounded-lg hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition duration-200 text-lg"
            >
              Profile
            </NavLink>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UserMenu;
