import React from "react";
import Header from "./Header";
import Footer from "./footers";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        {children}
        <Toaster />
      </main>
      <Footer />

    </div>
  );
};
Layout.defaultProps = {
  title: "MK AURA",
  description: "mern stack app",
  keywords: "dresses",
  author: "MK AURA",
};
export default Layout;
