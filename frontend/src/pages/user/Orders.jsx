import React, { useState, useEffect } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Your Orders"}>
      <div
        className="min-h-screen pt-28 pb-10 px-4"
        style={{
          background: "linear-gradient(to right, #ffecd2, #fcb69f)",
          minHeight: "100vh",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row gap-8">
          {/* Left Menu */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-">
              <UserMenu />
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-3/4">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-3xl font-bold text-center mb-8 text-gray-700">
                All Orders
              </h1>

              {orders?.map((o, i) => (
                <div
                  key={i}
                  className="border mb-8 rounded-xl p-6 shadow-md bg-gray-50"
                >
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="py-2 px-4 text-left font-semibold">
                          S.no
                        </th>
                        <th className="py-2 px-4 text-left font-semibold">
                          Status
                        </th>
                        <th className="py-2 px-4 text-left font-semibold">
                          Buyer
                        </th>
                        <th className="py-2 px-4 text-left font-semibold">
                          Date
                        </th>
                        <th className="py-2 px-4 text-left font-semibold">
                          Payment
                        </th>
                        <th className="py-2 px-4 text-left font-semibold">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-3 px-4">{i + 1}</td>
                        <td className="py-3 px-4">{o?.status}</td>
                        <td className="py-3 px-4">{o?.buyer?.name}</td>
                        <td className="py-3 px-4">
                          {moment(o?.createAt).fromNow()}
                        </td>
                        <td className="py-3 px-4">
                          {o?.payment.success ? "Success" : "Failed"}
                        </td>
                        <td className="py-3 px-4">{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Products */}
                  <div className="mt-6 grid gap-6 md:grid-cols-2">
                    {o?.products?.map((p) => (
                      <div
                        className="flex flex-col md:flex-row items-center bg-white p-4 rounded-lg shadow"
                        key={p._id}
                      >
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          alt={p.name}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                        <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                          <p className="font-bold text-gray-700">{p.name}</p>
                          <p className="text-gray-500 text-sm">
                            {p.description?.substring(0, 30)}...
                          </p>
                          <p className="mt-2 text-blue-600 font-semibold">
                            ₹ {p.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {orders?.length === 0 && (
                <p className="text-center text-gray-600 mt-8">
                  No orders found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
