// import Features from "../../components/Features";
import About from "../../components/About";
import Footer from "../../components/Footer";
import Homepage from "../../components/Homepage";
// import Home from "../../components/Home";
import Navbar from "../../components/Navbar";
import Products from "../../components/Products";

export default function Beranda() {
  return (
    <div>
      <Navbar />
      <Homepage />
      <About />
      <Products />

      <Footer />
    </div>
  );
}
