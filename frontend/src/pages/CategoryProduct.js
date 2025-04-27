import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../images/catimage.png"
import toast from "react-hot-toast";
import { useCart } from "../context/cart";

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();
    useEffect(() => {
        if (params?.slug) getPrductsByCat();
    }, [params?.slug]);

    const getPrductsByCat = async () => {
        try {
            const { data } = await axios.get(
                `/api/v1/product/product-category/${params.slug}`
            );
            setProducts(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mt-36 px-4">
                {/* Category Name and Image Section */}
                <div className="flex flex-col lg:flex-row items-center justify-between mb-8">
                    <div className="lg:w-1/2">
                        <h4 className="text-center text-4xl font-bold">{category?.name}</h4>
                        <h6 className="text-center text-lg text-gray-500">{products?.length} result(s) found</h6>

                    </div>
                    <div className="lg:w-1/2 mt-4 lg:mt-0">
                        <img
                            src={image}
                            alt={category?.name}
                            className="w-full h-auto  rounded-lg"
                        />
                    </div>
                </div>

                <hr className="my-8 mt-12" />

                {/* Products List Section */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products?.map((p) => (
                        <div className="card bg-white shadow-lg rounded-lg overflow-hidden" key={p._id}>
                            <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="w-full h-56"
                                alt={p.name}
                            />
                            <div className="p-4">
                                <div className="flex flex-col justify-between items-center mb-2">
                                    <h5 className="text-lg font-semibold">{p.name}</h5>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {p.description.substring(0, 60)}...
                                    </p>

                                </div>

                                <div className="flex gap-20 ">
                                    <p className="text-sm font-bold text-black">
                                        Online Payment: <span className='italic text-gray-600'>₹{p.price}</span>
                                    </p>
                                    <p className="text-sm font-bold text-black">
                                        Cash on Delivery: <span className='italic text-gray-600'>₹{p.cashprice}</span>
                                    </p>
                                </div>
                                <div className="flex justify-between items-center">
                                    <button
                                        className="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                                        onClick={() => navigate(`/product/${p.slug}`)}
                                    >
                                        More Details
                                    </button>
                                    <button
                                        className="btn bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900"
                                        onClick={() => {
                                            setCart([...cart, p]);
                                            localStorage.setItem(
                                                "cart",
                                                JSON.stringify([...cart, p])
                                            );
                                            toast.success("Item Added to cart");
                                        }}
                                    >
                                        ADD TO FAVOURITES
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default CategoryProduct;
