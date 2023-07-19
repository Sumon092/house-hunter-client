/* eslint-disable react/prop-types */
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 bg-gray-100">{children}</div>
      <Footer />
    </div>
    </>
  );
};

export default Layout;
