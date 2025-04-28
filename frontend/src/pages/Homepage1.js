import React, { useState, useEffect } from 'react';
import videoBg from '../images/bghome.mp4';
import dressHome from '../images/dresshome.jpg'; // 👉 Your existing product image
import collection1 from '../images/latest home.jpg'; // 👉 Add your collection images
import girl1 from "../images/homevideo.mp4"
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/footers';
import img1 from '../images/dresshome.jpg';
import img2 from '../images/latest home.jpg';
import img3 from '../images/dresshome.jpg';
import { Link } from 'react-router-dom';
import axios from "axios";


// Collections for New Collections Section
const collections = [
    {
        id: 1,
        name: 'Pooh',
        image: collection1,

    },
    {
        id: 2,
        name: 'Geet',
        image: collection1,

    },
    {
        id: 3,
        name: 'Aisha',
        image: collection1,

    },
    {
        id: 3,
        name: 'Naina',
        image: collection1,

    },
];




const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [allProducts, setAllProducts] = useState([]);
    const [total, setTotal] = useState(0);

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
            setAllProducts(data.products);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    const getTotal = async () => {
        try {
            const { data } = await axios.get("/api/v1/product/product-count");
            setTotal(data?.total);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        getTotal();
        getAllProducts();
    }, []);




    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const images = [img1, img2, img3];
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % images.length);
    const prevSlide = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000);

        return () => clearInterval(interval); // Clean up on unmount
    }, []);




    return (
        <div className="relative">

            {/* Background Video Section */}
            <div className="relative min-h-screen overflow-hidden">
                <video
                    className="absolute inset-0 w-full h-full object-cover z-0"
                    src={videoBg}
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

                {/* Header */}
                <div className="relative mt-20">
                    <Header isScrolled={isScrolled} />
                </div>
            </div>

            {/* Latest Arrival Section */}
            <div className="relative z-10 mt-16 px-4 md:px-16">
                <h2 className="text-5xl   mb-10 font-serif ml-10">
                    <span className="font-bold">Latest</span> <span className="text-gray-700 font-serif">Arrival</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 overflow-hidden">
                    {products?.slice(0, 8).map((p) => (
                        <div
                            key={p.id}
                            className="flex flex-col items-center p-4 shadow-md rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <div className="relative w-64 h-96 overflow-hidden">
                                <Link to={`/product/${p.slug}`}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        alt={p.name}
                                        className="w-full h-auto object-cover rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] hover:scale-105 transition-transform duration-300 hover:rounded-[50%_30%_40%_60%_/_70%_40%_60%_50%]"
                                    />
                                </Link>
                            </div>

                            <Link to={`/product/${p.slug}`} className="mt-4 text-center text-base font-semibold font-sans">
                                {p.name}
                            </Link>
                            <p className="text-sm text-gray-500">MY STORE</p>

                            <div className="flex flex-col ">
                                <p className="text-sm font-bold text-black">
                                    Online Payment: <span className='italic text-gray-600'>₹{p.price}</span>
                                </p>
                                <p className="text-sm font-bold text-black">
                                    Cash on Delivery: <span className='italic text-gray-600'>₹{p.cashprice}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Shop Now Button */}
                <div className="flex justify-center mt-10">
                    <Link to="/store" className="px-12 py-3 bg-blue-800 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300">
                        View All
                    </Link>
                </div>
            </div>

            {/* New Collections Section */}
            <div className="relative z-10 mt-20 px-4 md:px-16">
                <h2 className="text-5xl  ml-6 mb-10 font-serif">
                    <span className="font-bold">New</span> <span className="text-gray-700">Collections</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {collections.map((collection) => (
                        <a
                            key={collection.id}
                            href={`/category/${collection.name.toLowerCase()}`}

                            rel="noopener noreferrer"
                            className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
                        >
                            <div className="relative w-80 h-[450px] overflow-hidden rounded-lg shadow-md">
                                <img
                                    src={collection.image}
                                    alt={collection.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <p className="mt-4 text-xl font-semibold">{collection.name} →</p>
                        </a>
                    ))}
                </div>
            </div>



            {/* Banner Section */}
            <div className="relative z-10 mt-20">
                <div className="w-full bg-gray-700 shadow-lg overflow-hidden h-16 flex items-center">
                    <div className="whitespace-nowrap animate-marquee text-white text-2xl  flex items-center gap-4">
                        Welcome to the MK AURA where Pinterest meets your Interest  Welcome to the MK AURA where Pinterest meets your Interest  Welcome to the MK AURA where Pinterest meets your Interest
                    </div>
                </div>
            </div>



            {/* Pinterest Ki Apsara Section */}
            <section className="relative z-10 px-4 md:px-16 mt-20">
                <h2 className="text-3xl font-bold font-serif mb-12 ml-6">Pinterest Ki Apsara</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                        <video
                            src={girl1} // 👈 make sure girl1 is a video URL or import
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                        <video
                            src={girl1}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                        <video
                            src={girl1}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="overflow-hidden rounded-xl shadow-md hover:scale-105 transition-transform duration-300">
                        <video
                            src={girl1}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* Latest Arrival Section */}
            <div className="relative z-10 mt-16 px-4 md:px-16">
                <h2 className="text-5xl ml-6 mb-10 font-serif">
                    <span className="text-gray-700 font-bold">Latest</span> <span className="text-gray-700">Arrival</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 overflow-hidden">
                    {products.slice(0, 4).map((p) => ( // Ensure only the first 4 products are mapped
                        <div
                            key={p.id}
                            className="flex flex-col items-center p-4 shadow-md rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            <div className="relative w-64 h-96 overflow-hidden">
                                <Link to={`/product/${p.slug}`}>
                                    <img
                                        src={`/api/v1/product/product-photo/${p._id}`}
                                        alt={p.name}
                                        className="w-full h-full object-cover rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%] hover:scale-105 transition-transform duration-300 hover:rounded-[50%_30%_40%_60%_/_70%_40%_60%_50%]"
                                    />
                                </Link>
                            </div>

                            <Link to={`/product/${p.slug}`} className="mt-4 text-center text-base font-semibold font-sans">
                                {p.name}
                            </Link>
                            <p className="text-sm text-gray-500">MY STORE</p>

                            <div className="flex flex-col ">
                                <p className="text-sm font-bold text-black">
                                    Online Payment: <span className='italic text-gray-600'>₹{p.price}</span>
                                </p>
                                <p className="text-sm font-bold text-black">
                                    Cash on Delivery: <span className='italic text-gray-600'>₹{p.cashprice}</span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
            <div className="flex justify-center mt-8">
                <Link to="/store" className="px-12 py-3 border border-black text-black font-medium rounded-md hover:text-bold transition-all duration-300">
                    View all
                </Link>
            </div>




            <div className="relative min-h-screen overflow-hidden mt-10">

                {/* Main Image Carousel */}
                <div className="relative z-10 flex flex-col items-center justify-center h-auto px-4">
                    <div className="relative w-full h-auto">
                        <img
                            src={images[current]}
                            alt={`Slide ${current + 1}`}
                            className="w-full h-auto object-cover transition-all duration-500"
                        />

                        {/* Overlay Text */}
                        <div className="absolute bottom-0 left-0 flex flex-col items-start justify-start text-left text-white px-4 py-6 mb-24">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono text-red-950">
                                Discover elegance redefined
                            </h1>
                            <p className="text-lg md:text-2xl mb-6 font-mono text-red-950">
                                Indulge in timeless kurtas and suits that speak to your individuality and grace
                            </p>
                            <Link to="/store" className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white transition">
                                Shop Now
                            </Link>
                        </div>


                        {/* Left Arrow */}
                        <button
                            onClick={prevSlide}
                            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/70 p-3 rounded-full hover:bg-white z-10"
                        >
                            &#8592;
                        </button>

                        {/* Right Arrow */}
                        <button
                            onClick={nextSlide}
                            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/70 p-3 rounded-full hover:bg-white z-10"
                        >
                            &#8594;
                        </button>
                    </div>

                    {/* Pagination Dots */}
                    <div className="mt-6 flex gap-4">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`w-6 h-6 flex items-center justify-center text-sm font-bold rounded-full ${current === index ? 'bg-white text-black' : 'bg-white/50 text-black/50'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />

        </div>
    );
};

export default HomePage;