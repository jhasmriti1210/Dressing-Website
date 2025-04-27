import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Blue Cloud"}>
      <div className="container-fluid mt-24 p-12 dashboard bg-gray-50 min-h-screen">
        <div className="row mt-12">
          <div className="col-md-3">
            <div className="shadow-xl rounded-lg bg-white p-6">
              <UserMenu />
            </div>
          </div>
          <div className="col-md-9">
            <div className="card shadow-xl rounded-lg w-full p-8 bg-white mt-5">
              <h3 className="text-3xl font-semibold text-blue-700 mb-6">
                User Information
              </h3>
              <div className="space-y-5">
                <div className="text-xl font-medium text-gray-800">
                  <strong>Name:</strong> {auth?.user?.name}
                </div>
                <div className="text-xl font-medium text-gray-800">
                  <strong>Email:</strong> {auth?.user?.email}
                </div>
                <div className="text-xl font-medium text-gray-800">
                  <strong>Contact:</strong> {auth?.user?.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
