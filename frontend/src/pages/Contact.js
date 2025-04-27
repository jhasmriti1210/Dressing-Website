import React from "react";
import Layout from "../components/Layout/Layout"; // Adjust path according to your project structure

const Contact = () => {
    return (
        <Layout>
            <div className="flex items-center justify-center min-h-screen p-6 md:p-12">
                <div className="rounded-lg p-8 md:p-12 w-full md:w-2/3 lg:w-1/2">
                    <h2 className="text-3xl md:text-5xl font-semibold text-center mb-6 text-gray-800">
                        Contact Information
                    </h2>
                    <p className="text-lg md:text-xl text-center text-gray-700 mb-4">
                        If you have any queries or need assistance, feel free to reach out to us at:
                    </p>
                    <p className="text-xl md:text-2xl font-semibold text-blue-600 mt-4 text-center">
                        <a href="mailto:pehrinbytwoparammitras@gmail.com" className="hover:underline">
                            pehrinbytwoparammitras@gmail.com
                        </a>
                    </p>
                    <p className="font-semibold text-center">
                        <span className="text-lg md:text-xl text-gray-700 ">Or give us a call at:</span>
                        <a href="tel:+1234567890" className="block hover:underline text-blue-600 md:text-2xl text-xl mt-6">
                            +1 (234) 567-890
                        </a>
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export default Contact;
