import React from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
    const [auth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();

    //delete item
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="bg-gray-100 rounded-lg shadow-md p-4 mt-16">
                    <h1 className="text-center text-2xl font-bold mb-2">
                        {!auth?.user ? "Hello Guest" : `Hello ${auth?.user?.name}!`}
                    </h1>
                    <p className="text-center text-lg mb-4">
                        {cart?.length
                            ? `You Have ${cart.length} item in your Favourites`
                            : "Your Favourites List is Empty"}
                    </p>

                    <div className="space-y-4">
                        {cart?.map((p) => (
                            <div className="flex bg-white shadow-lg rounded-lg overflow-hidden p-4" key={p._id}>
                                <div className="w-1/3">
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        className="w-full h-32 object-cover"
                                        alt={p.name}
                                    />
                                </div>
                                <div className="w-2/3 px-4">
                                    <p className="text-lg font-semibold">{p.name}</p>
                                    <p className="text-sm text-gray-600">{p.description.substring(0, 30)}</p>
                                    <p className="text-xl font-bold">Price: ₹{p.price}</p>
                                    <button
                                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        onClick={() => removeCartItem(p._id)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {auth?.token && cart?.length > 0 && (
                        <div className="text-center mt-8">
                            <Link
                                to="/payment"
                                className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-all duration-300"
                            >
                                Proceed to Payment
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
