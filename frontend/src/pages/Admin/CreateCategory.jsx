import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  // Handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/category/create-category", {
        name,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in input form");
    }
  };

  // Get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong in getting category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`Category deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
      <div
        className="min-h-screen bg-pink-100 p-6 pt-36 mt-24"
        style={{
          background: "linear-gradient(to right, #ffecd2, #fcb69f)",
          minHeight: "100vh",
          marginTop: "80px",
        }}
      >
        <div className="flex w-full md:flex-row gap-8 container mx-auto">
          {/* Left Sidebar */}
          <div className="">
            <div className="bg-white w-full p-8 rounded-xl shadow-lg border border-gray-200">
              <AdminMenu />
            </div>
          </div>

          {/* Right Content */}
          <div className="md:w-3/4 w-full flex flex-col gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-4xl font-bold text-center md:text-left mb-6 text-black">
                Manage Categories
              </h1>

              {/* Category Form */}
              <div className="w-full">
                <CategoryForm
                  handleSubmit={handleSubmit}
                  value={name}
                  setValue={setName}
                />
              </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 overflow-x-auto w-full">
              <h2 className="text-2xl font-semibold text-gray-700 mb-6">
                All Categories
              </h2>
              <table className="min-w-full text-center">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6">Name</th>
                    <th className="py-3 px-6">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr
                      key={c._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-all duration-200"
                    >
                      <td className="py-3 px-6">{c.name}</td>
                      <td className="py-3 px-6 space-x-2">
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                          onClick={() => handleDelete(c._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Modal for Update */}
            <Modal
              open={visible}
              onCancel={() => setVisible(false)}
              footer={null}
            >
              <div className="p-6 bg-white rounded-xl border border-gray-200">
                <h2 className="text-xl font-bold mb-4 text-gray-700">
                  Update Category
                </h2>
                <CategoryForm
                  value={updatedName}
                  setValue={setUpdatedName}
                  handleSubmit={handleUpdate}
                />
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
