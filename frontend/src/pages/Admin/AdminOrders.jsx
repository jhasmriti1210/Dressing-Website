import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status, setStatus] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancel",
  ]);
  const [changeStatus, setChangeStatus] = useState("");
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/auth/all-orders?sortBy=${sortBy}&sortOrder=${sortOrder}`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token, sortBy, sortOrder]);

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(`/api/v1/auth/order-status/${orderId}`, {
        status: value,
      });
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"All Orders Data"}>
      <div
        className="admin-orders-page py-4 px-6 "
        style={{
          background: "linear-gradient(to right, #ffecd2, #fcb69f)",
          minHeight: "100vh",
        }}
      >
        <div className="row dashboard">
          <div className="col-md-3 mb-3">
            <AdminMenu />
          </div>
          <div className="col-md-9 bg-white rounded-xl">
            <h1 className="text-center mb-4 mt-8 text-4xl text-black font-bold">
              All Orders
            </h1>
            {orders?.map((o, i) => (
              <div
                className="order-card mb-4 p-3 shadow-sm bg-white rounded"
                key={o._id}
              >
                <table className="table table-responsive">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Status</th>
                      <th>Buyer</th>
                      <th>Date</th>
                      <th>Payment</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                      <td>
                        <Select
                          bordered={false}
                          onChange={(value) => handleChange(o._id, value)}
                          defaultValue={o?.status}
                          className="w-100"
                        >
                          {status.map((s, i) => (
                            <Option key={i} value={s}>
                              {s}
                            </Option>
                          ))}
                        </Select>
                      </td>
                      <td>{o?.buyer?.name}</td>
                      <td>{moment(o?.createdAt).fromNow()}</td>
                      <td>{o?.payment.success ? "Success" : "Failed"}</td>
                      <td>{o?.products?.length}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="container">
                  {o?.products?.map((p) => (
                    <div className="row mb-2 p-2 bg-light rounded" key={p._id}>
                      <div className="col-md-4 col-12 d-flex align-items-center">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="img-fluid rounded"
                          alt={p.name}
                          width="100"
                          height="100"
                        />
                      </div>
                      <div className="col-md-8 col-12">
                        <p className="fw-bold">{p.name}</p>
                        <p>{p.description.substring(0, 40)}...</p>
                        <p className="text-primary">Price: ${p.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
