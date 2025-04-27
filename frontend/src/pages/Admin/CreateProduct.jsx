import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [cashprice, setcashPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // get all categories
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

  // create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("cashprice", cashprice);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div
        className="container-fluid p-5"
        style={{
          background: "linear-gradient(to right, #ffecd2, #fcb69f)",
          minHeight: "100vh",
          marginTop: "80px",
        }}
      >
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <div
              className="card shadow-lg p-4"
              style={{
                borderRadius: "15px",
                backgroundColor: "#fff",
              }}
            >
              <h2
                className="text-center mb-4"
                style={{
                  fontWeight: "bold",
                  color: "black",
                  fontSize: "2.5rem",
                  letterSpacing: "1px",
                }}
              >
                Create New Product
              </h2>

              <form onSubmit={handleCreate}>
                <div className="mb-3">
                  <Select
                    bordered={true}
                    placeholder="Select a category"
                    size="large"
                    showSearch
                    className="form-select"
                    style={{ width: "100%" }}
                    onChange={(value) => setCategory(value)}
                  >
                    {categories?.map((c) => (
                      <Option key={c._id} value={c._id}>
                        {c.name}
                      </Option>
                    ))}
                  </Select>
                </div>

                <div className="mb-3">
                  <label className="btn btn-outline-primary w-100">
                    {photo ? photo.name : "Upload Product Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>

                <div className="mb-3 text-center">
                  {photo && (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height="200px"
                      className="img-fluid rounded shadow"
                    />
                  )}
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="Enter product name"
                    className="form-control form-control-lg"
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <textarea
                    value={description}
                    placeholder="Enter product description"
                    className="form-control form-control-lg"
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      value={price}
                      placeholder="Enter Online price"
                      className="form-control form-control-lg"
                      onChange={(e) => setPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      value={cashprice}
                      placeholder="Enter COD price"
                      className="form-control form-control-lg"
                      onChange={(e) => setcashPrice(e.target.value)}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <input
                      type="number"
                      value={quantity}
                      placeholder="Enter quantity"
                      className="form-control form-control-lg"
                      onChange={(e) => setQuantity(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <Select
                    bordered={true}
                    placeholder="Select Shipping"
                    size="large"
                    showSearch
                    className="form-select"
                    style={{ width: "100%" }}
                    onChange={(value) => setShipping(value)}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>

                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-lg"
                    style={{
                      backgroundColor: "#ff7e5f",
                      color: "#fff",
                      padding: "10px 40px",
                      fontSize: "1.2rem",
                      borderRadius: "30px",
                      letterSpacing: "1px",
                    }}
                  >
                    CREATE PRODUCT
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
