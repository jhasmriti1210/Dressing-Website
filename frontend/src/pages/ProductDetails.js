import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import { Link } from "react-router-dom";
import { FaWhatsapp, FaFacebook, FaTwitter, FaEnvelope, FaDiscord, FaTimes } from "react-icons/fa";

const ProductDetails = () => {
    const [cart, setCart] = useCart();
    const params = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [showShareOptions, setShowShareOptions] = useState(false);

    // Initial details
    useEffect(() => {
        if (params?.slug) getProduct();
    }, [params?.slug]);

    // Get product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category._id);
        } catch (error) {
            console.log(error);
        }
    };

    // Get similar products
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        } catch (error) {
            console.log(error);
        }
    };

    // Handle adding to cart
    const handleAddToCart = () => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        toast.success("Item added to Favourites");
    };

    const handleShare = (platform) => {
        const url = window.location.href;
        const message = `${product.name}\n${product.description}\n${url}`;

        if (platform === "whatsapp") {
            window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
        } else if (platform === "email") {
            window.open(`mailto:?subject=Check out this product: ${encodeURIComponent(product.name)}&body=${encodeURIComponent(message)}`, '_blank');
        } else if (platform === "facebook") {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        } else if (platform === "twitter") {
            window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(message)}`, '_blank');
        }
        setShowShareOptions(false); // close popup after sharing
    };

    return (
        <Layout>
            <div className="container mx-auto py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    {/* Product Image */}
                    <div className="flex justify-center items-center">
                        <img
                            src={`/api/v1/product/product-photo/${product._id}`}
                            className="w-full max-w-md object-cover rounded-lg shadow-lg"
                            alt={product.name}
                        />
                    </div>

                    {/* Product Details */}
                    <div className="flex flex-col justify-between p-6 space-y-4">
                        <h1 className="text-3xl font-semibold text-center">{product.name}</h1>

                        <p className="text-lg">{product.description}</p>

                        <p className="text-xl font-bold">
                            Online Price:{" "}
                            <span className="text-gray-700">
                                {product?.price?.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </span>
                        </p>

                        <p className="text-xl font-bold -mt-4">
                            COD Price:{" "}
                            <span className="text-gray-700">
                                {product?.cashprice?.toLocaleString("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                })}
                            </span>
                        </p>

                        <p className="text-lg mt-2">
                            Category: <span className="font-medium">{product?.category?.name}</span>
                        </p>

                        <div className="flex flex-wrap gap-4 mt-4">
                            <button
                                className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-all duration-300"
                                onClick={handleAddToCart}
                            >
                                Add to Favourites
                            </button>
                            <Link
                                to="/payment"
                                className="bg-yellow-500 text-black font-semibold py-2 px-6 rounded-md hover:bg-yellow-400 transition-all duration-300"
                            >
                                Buy Now
                            </Link>
                            {/* Share Button */}
                            <div className="relative">
                                <button
                                    className="bg-green-700 text-white py-2 px-6 rounded-md hover:bg-blue-400"
                                    onClick={() => setShowShareOptions(true)}
                                >
                                    Share
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="my-8" />

                {/* Share Modal */}
                {showShareOptions && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white rounded-lg p-6 relative w-80">
                            {/* Close Button */}
                            <button
                                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                onClick={() => setShowShareOptions(false)}
                            >
                                <FaTimes size={20} />
                            </button>

                            <h2 className="text-xl font-semibold mb-4 text-center">Share via</h2>

                            <div className="grid grid-cols-3 gap-4">
                                <button
                                    className="flex flex-col items-center text-green-500 hover:text-green-600"
                                    onClick={() => handleShare("whatsapp")}
                                >
                                    <FaWhatsapp size={30} />
                                    <span className="text-xs mt-1">WhatsApp</span>
                                </button>

                                <button
                                    className="flex flex-col items-center text-blue-700 hover:text-blue-800"
                                    onClick={() => handleShare("facebook")}
                                >
                                    <FaFacebook size={30} />
                                    <span className="text-xs mt-1">Facebook</span>
                                </button>

                                <button
                                    className="flex flex-col items-center text-blue-400 hover:text-blue-500"
                                    onClick={() => handleShare("twitter")}
                                >
                                    <FaTwitter size={30} />
                                    <span className="text-xs mt-1">Twitter</span>
                                </button>

                                <button
                                    className="flex flex-col items-center text-red-500 hover:text-red-600"
                                    onClick={() => handleShare("email")}
                                >
                                    <FaEnvelope size={30} />
                                    <span className="text-xs mt-1">Email</span>
                                </button>

                                <button
                                    className="flex flex-col items-center text-indigo-500 hover:text-indigo-600"
                                    onClick={() => alert('Discord sharing coming soon!')}
                                >
                                    <FaDiscord size={30} />
                                    <span className="text-xs mt-1">Discord</span>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div className="container mx-auto mt-12">
                    <h4 className="text-2xl font-semibold text-center mb-6">You May Also Like</h4>
                    {relatedProducts.length < 1 && (
                        <p className="text-center text-lg">No Similar Products found</p>
                    )}
                    <div className="flex flex-wrap justify-start gap-6">
                        {relatedProducts?.map((p) => (
                            <div
                                key={p._id}
                                className="max-w-xs w-full bg-white rounded-lg shadow-md overflow-hidden"
                            >
                                <img
                                    src={`/api/v1/product/product-photo/${p._id}`}
                                    className="w-full h-auto object-cover rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] hover:scale-105 transition-transform duration-300 hover:rounded-[50%_30%_40%_60%_/_70%_40%_60%_50%]"
                                    alt={p.name}
                                />
                                <div className="p-4">
                                    <h5 className="text-xl font-semibold">{p.name}</h5>
                                    <p className="text-gray-700 text-base mb-4">
                                        {p.description.substring(0, 60)}...
                                    </p>
                                    <p className="text-base font-bold">
                                        Online Price:{" "}
                                        <span className="text-gray-700">
                                            {p?.price?.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            })}
                                        </span>
                                    </p>

                                    <p className="text-base font-bold mt-2">
                                        COD Price:{" "}
                                        <span className="text-gray-700">
                                            {p?.cashprice?.toLocaleString("en-IN", {
                                                style: "currency",
                                                currency: "INR",
                                            })}
                                        </span>
                                    </p>
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition duration-300"
                                            onClick={() => navigate(`/product/${p.slug}`)}
                                        >
                                            More Details
                                        </button>
                                        <button
                                            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300"
                                            onClick={() => {
                                                const updatedCart = [...cart, p];
                                                setCart(updatedCart);
                                                localStorage.setItem("cart", JSON.stringify(updatedCart));
                                                toast.success("Item added to cart");
                                            }}
                                        >
                                            Add to Favourites
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetails;
