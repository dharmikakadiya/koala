import Home from "./Pages/Home";
import { Route, Routes } from "react-router-dom";
import LivingRoom from "./Pages/categoryCollections/levaingRoom";
import Bedroom from "./Pages/categoryCollections/bedRoom";
import Outdoor from "./Pages/categoryCollections/outDoor";
import KoalaBluey from "./Pages/categoryCollections/koalaBluey";
import Navbar from "./components/Navbar/Navbar";
import TopOfferBar from "./components/Topoffer/TopOfferBar";
import Footer from "./components/Footer/Footer";
import SofaBeds from "./Pages/categoryCollections/levaingRoom/sofa-beds";
import ProductDetail from "./Pages/ProductDetail";
import CartProvider from "./context/CartContext";

function App() {
  return (
    <>
    <CartProvider>
      <TopOfferBar />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections/living-room" element={<LivingRoom />} />
        <Route path="/collections/bedroom" element={<Bedroom />} />
        <Route path="/collections/outdoor" element={<Outdoor />} />
        <Route path="/collections/koala-bluey" element={<KoalaBluey />} />
        <Route path="/collections/living-room/sofa-beds" element={<SofaBeds />} />

        {/* ✅ PRODUCT DETAIL */}
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/context/cartcontext" element={<ProductDetail />} />

      </Routes>

      <Footer />
      </CartProvider>
    </>
  );
}

export default App;