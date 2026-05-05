import { useNavigate } from "react-router-dom";
import { ChevronDown, Search, UserCircle2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import axios from "axios";
import CartDrawer from "../../components/cartModal/index";
import API_URL from "../../Api_path";

export default function Navbar() {

  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [bluey, setBluey] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  console.log("🚀 ~ Navbar ~ cartItems:", cartItems)
  

  // ✅ Fetch categories
  useEffect(() => {
    axios.get("http://localhost:5000/categories")
      .then(res => setCategories(res.data || []))
      .catch(err => console.error("Error fetching categories:", err));
  }, []);
useEffect(() => {
  axios.get(`${API_URL}/cart`)
    .then(res => setCartItems(res.data || []))
    .catch(err => console.error("Error fetching cart items:", err));
}, []);
  // ✅ Fetch bluey
  useEffect(() => {
    axios.get("http://localhost:5000/bluey")
      .then(res => setBluey(res.data || []))
      .catch(err => console.error("Error fetching bluey:", err));
  }, []);
 
  return (
    <>
      <nav className="relative w-full border-b border-[#e5e5e5] bg-[#f8f8f6] z-40">
        <div className="flex w-full items-center justify-between px-8 py-4">

          {/* LOGO */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              navigate("/");
              window.scrollTo(0, 0);
            }}
          >
            <h1 className="text-[44px] md:text-[50px] font-extrabold text-[#69705b]">
              koala
            </h1>
            <span className="ml-1 mt-5 text-[#69705b] text-xs font-bold">®</span>
          </div>

          {/* MENU */}
          <div className="hidden lg:flex items-center gap-8 text-[16px] font-semibold text-[#2f2e2a]">

            {/* SALE BUTTON */}
            <button className="rounded-full bg-[#cbf2d6] px-5 py-2 text-[14px] font-bold hover:bg-[#b5e6c2]">
              Shop Sale
            </button>

            {/* CATEGORY MENU */}
            {categories.map((cat, index) => (
              <div key={index} className="group flex items-center h-[80px] -my-[30px]">

                <div className="flex items-center gap-1.5 cursor-pointer">
                  <span className="group-hover:text-[#69705b] border-b-2 border-transparent group-hover:border-[#69705b]">
                    {cat.name}
                  </span>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition" />
                </div>

                {/* DROPDOWN */}
                <div className="absolute left-0 top-full w-full bg-[#f8f8f6] border-t shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                  <div className="px-9 py-10 flex flex-col gap-8">

                    {/* HEADER */}
                    <div className="flex justify-between">
                      <h2 className="text-[32px] font-extrabold">{cat.name}</h2>

                      {/* ✅ FIX: NAVIGATION BUTTON */}
                      <button
                        onClick={() => navigate(`/collections/${cat.name.toLowerCase().replace(" ", "-")}`)}
                        className="rounded-full bg-[#69705b] px-6 py-3 text-white"
                      >
                        Shop all {cat.name?.toLowerCase()}
                      </button>
                    </div>

                    {/* ITEMS */}
                    <div className="grid grid-cols-7 gap-4">
                      {cat.items?.map((item) => (
                        <ProductCard
                          key={item.id}
                          title={item.title}
                          img={item.img}
                          discount={item.discount}
                          navigate={item.navigate}
                        />
                      ))}
                    </div>

                  </div>
                </div>
              </div>
            ))}

            {/* BLUEY */}
            <div className="group flex items-center h-[80px] -my-[30px]">

              <div className="flex items-center gap-1.5 cursor-pointer">
                <img
                  src="https://au.koala.com/cdn/shop/files/Logo_3.svg"
                  alt="Bluey Logo"
                  className="w-[65px]"
                />
                <ChevronDown size={16} />
              </div>

              <div className="absolute left-0 top-full w-full bg-[#f8f8f6] border-t shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">

                <div className="px-9 py-10 flex flex-col gap-8">

                  <div className="flex justify-between">
                    <h2 className="text-[32px] font-extrabold">Koala x Bluey</h2>
                  </div>

                  <div className="grid grid-cols-7 gap-4">
                    {bluey.map((item) => (
                      <ProductCard
                        key={item.id}
                        title={item.title}
                        img={item.img}
                        discount={item.discount}
                      />
                    ))}
                  </div>

                </div>
              </div>
            </div>

          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6">
            <Search size={22} />
            <UserCircle2 size={24} />

            {/* ✅ CART CLICK */}
            <div className="relative">
              <ShoppingCart
                size={24}
                onClick={() => setIsCartOpen(true)}
                className="cursor-pointer"
              />

              {/* ✅ COUNT BADGE */}
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>

          </div>

        </div>
      </nav>

      {/* CART DRAWER */}
      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          items={cartItems}
        />
      )}

    </>

  );
}