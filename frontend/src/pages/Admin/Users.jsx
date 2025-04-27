import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8082/api/v1/auth/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Layout title={"All Registered Users"}>
      <div
        className="min-h-screen pt-32 pb-10 px-4"
        style={{
          background: "linear-gradient(to right, #ffecd2, #fcb69f)",
        }}
      >
        <div className="container mx-auto flex flex-col md:flex-row lg:flex-row gap-8 ">
          {/* Left Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 mt-32">
              <AdminMenu />
            </div>
          </div>

          {/* Right Content */}
          <div className="min-h-screen w-full mt-32">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-4xl font-bold text-center mb-8 text-black">
                Registered Users
              </h1>

              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                        Name
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                        Email
                      </th>
                      <th className="py-3 px-6 text-left text-sm font-semibold text-gray-700">
                        Phone
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} className="border-t">
                        <td className="py-4 px-6 text-gray-700">{user.name}</td>
                        <td className="py-4 px-6 text-gray-700">
                          {user.email}
                        </td>
                        <td className="py-4 px-6 text-gray-700">
                          {user.phone}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
