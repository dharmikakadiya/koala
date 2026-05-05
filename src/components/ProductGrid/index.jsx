import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ProductGrid({ products = [] }) {
  const navigate = useNavigate();

  if (!products.length) {
    return <p className="text-center mt-10">No products found</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10  px-6 mt-10 mb-10">
      {products.map((product) => {
        const [selectedColor, setSelectedColor] = useState(product.colors[0]);

        return (
          <div
            key={product.id}
            className="group cursor-pointer"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {/* IMAGE */}
            <div className="bg-gray-100 rounded-2xl overflow-hidden relative hover:shadow-lg transition">
              <span className="absolute top-3 left-3 bg-green-200 text-green-800 text-xs px-3 py-1 rounded-full">
                Best Seller
              </span>

              <img
                src={selectedColor.image}
                alt={product.title}
                onError={(e) => (e.target.src = "https://via.placeholder.com/300")}
                className="w-full h-64 object-contain p-6 transition duration-300 group-hover:scale-105"
              />
            </div>

            {/* DETAILS */}
            <div className="mt-4 space-y-2">
            <p className="text-lg text-black flex items-center gap-3">
                {product.rate}<FaStar className="text-yellow-500" /> <FaStar className="text-yellow-500"/>
                <FaStar className="text-yellow-500" /><FaStar className="text-yellow-500" />
              </p>

              <h2 className="text-lg font-semibold text-[#2f2e2a]">
                {product.title}
              </h2>

              <p className="text-gray-500 text-sm">
                Premium Furniture • 3 Sizes
              </p>

              <p className="font-bold text-lg text-[#2f2e2a]">
                ₹{product.price}
              </p>

              {/* COLORS */}
              <div className="flex gap-2 mt-2">
                {product.colors.map((color) => (
                  <span
                    key={color.name}
                    className="w-5 h-5 rounded-full border cursor-pointer"
                    style={{ backgroundColor: color.name }}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent navigation
                      setSelectedColor(color);
                    }}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
