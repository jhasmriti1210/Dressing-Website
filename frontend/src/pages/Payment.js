import React from "react";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { useNavigate, Link } from "react-router-dom";
import qrcode from "../images/qr.png";

const PaymentPage = () => {
    const [auth] = useAuth();
    const [cart] = useCart();
    const navigate = useNavigate();

    // Calculate total price
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.forEach((item) => {
                total += item.price;
            });
            return `₹${total.toLocaleString("en-IN")}`;
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="bg-gray-100 rounded-lg shadow-md p-4 mt-16">
                    <h2 className="text-3xl font-bold text-center mb-8">Payment Information</h2>

                    <div className="bg-white shadow-lg rounded-lg p-8">

                        {/* QR Code Payment */}
                        <div className="mt-6 flex flex-col md:flex-row items-center justify-center gap-12">

                            {/* Left Side - QR Code */}
                            <div className="flex flex-col items-center">
                                <img
                                    src={qrcode}
                                    alt="Payment QR"
                                    className="w-72 h-72 mb-4" // ⬅️ Increased size
                                />
                                <p className="text-lg font-medium mb-2">UPI ID: example@upi</p>
                                <p className="text-gray-600 text-sm text-center">Scan the QR code or send payment to the UPI ID mentioned above.</p>
                            </div>

                            {/* Right Side - Instructions */}
                            <div className="text-center md:text-left">
                                <h1 className="text-black text-xl mb-4 font-semibold">
                                    Send Your Size (XS/SM/M/LG/XL/2XL) and Quantity on given WhatsApp no.
                                </h1>
                                <h1 className="text-black text-xl mb-4 font-semibold">
                                    You Can See Our Size Chart on <Link className="text-blue-500 underline" to="/">Chart Page</Link>
                                </h1>
                                <h1 className="text-black text-xl font-semibold">
                                    Note: After payment, send the screenshot on this WhatsApp No. <br /> <span className="text-green-600 font-bold">+91 1234567890</span>
                                </h1>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default PaymentPage;
