import React from 'react'
import footerBg from '../../images/footer.jpg';

const footers = () => {
    return (
        <footer className="h-84 bg-gradient-to-r from-gray-900 via-black to-gray-800 text-white relative bg-cover bg-center text-center text-brown-800 py-16 mt-4">



            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center space-y-4 px-4">
                <h2 className="text-3xl md:text-5xl font-extrabold text-brown-900 font-mono">MK AURA</h2>
                <p className="italic text-lg md:text-2xl text-brown-700">
                    by two Paramitras... <span className="italic">Sirf tumahre nakhro ke liye</span>
                </p>

                {/* Social Media Icons */}
                <div className="flex items-center justify-center space-x-6 mt-4">
                    <a href="#" className="text-brown-700 hover:text-brown-900 text-2xl">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="text-brown-700 hover:text-brown-900 text-2xl">
                        <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#" className="text-brown-700 hover:text-brown-900 text-2xl">
                        <i className="fab fa-pinterest"></i>
                    </a>
                </div>

                {/* Bottom Links */}
                <div className="text-sm text-brown-600 mt-6 flex flex-wrap justify-center gap-4">
                    <p>© 2025, MK AURA</p>
                    <a href="#" className="hover:underline">Privacy policy</a>
                    <a href="#" className="hover:underline">Terms of service</a>
                    <a href="/contact" className="hover:underline">Contact information</a>
                </div>
            </div>
        </footer>
    )
}

export default footers