import { useState, useEffect } from "react"; // ✅ ADD THIS
import Banner from "../../components/Banner/index.jsx";
import CategoryGrid from "../../components/CategoryGrid.jsx/index.jsx";
import ProductGrid from "../../components/ProductGrid/index.jsx";
import axios from "axios";
import API_URL from "../../Api_path";
import TopOfferBar from "../../components/Topoffer/TopOfferBar.jsx";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/Footer/Footer.jsx";

export default function BedRoom() {
  const [data, setData] = useState(null);
  console.log("🚀 ~ BedRoom ~ data:", data)

  useEffect(() => {
    axios.get(`${API_URL}/featuredCategories`)
      .then((res) => {
        const livingRoomData = res.data.find(
          (item) => item.navigate === "bedroom" || 
                    item.title?.toLowerCase() === "bedroom"
        );
        setData(livingRoomData);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!data) return <div>Loading...</div>;

  // Default banner agar db mein nahi hai
  const bannerData = data.banner || {
    title: data.title || "Bedroom",
    subtitle: data.discount || "",
    image: data.img || "",
  };

  return (
    <div className="min-h-screen bg-white">
      <TopOfferBar />
      <Navbar />

      {bannerData.image ? (
        <Banner {...bannerData} />
      ) : (
        <div className="w-full h-[300px] bg-[#f0ede8] flex items-center px-12">
          <div>
            <h1 className="text-[48px] font-bold text-[#2f2e2a]">{bannerData.title}</h1>
            {bannerData.subtitle && (
              <p className="text-[18px] text-gray-600 mt-2">{bannerData.subtitle}</p>
            )}
          </div>
        </div>
      )}

      <CategoryGrid categories={data.categories} />

      <ProductGrid products={data.products} />
      <Footer />

    </div>
  );
}