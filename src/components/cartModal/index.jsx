import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";


export default function CartDrawer({ product, onClose }) {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  return (
    <div className="fixed inset-0 flex justify-end z-50">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      ></div>

      {/* Drawer */}
      <div className="relative w-[400px] bg-white h-full shadow-xl flex flex-col">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        {/* TOP CONTENT */}
        <div className="p-6 flex-1 overflow-y-auto">

          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

          {/* Product */}
          <div className="flex gap-4 items-start border-b pb-4">
            <img
            src={product.selectedColor?.image}
              className="w-20 h-20 object-contain rounded-lg border"
            />

            <div className="flex-1">

            <h2 className="text-lg font-semibold text-[#2f2e2a]">
                {product.title}
              </h2>

              <p className="text-lg text-black flex items-center gap-3">
                {product.rate}<FaStar className="text-yellow-500" /> <FaStar className="text-yellow-500"/>
                <FaStar className="text-yellow-500" /><FaRegStarHalfStroke className="text-yellow-500" />
              </p>

              {/* Price */}
              <p className="text-gray-800 font-semibold mt-1">
                ₹{product.price}
              </p>

              {/* Small subtitle */}
              <p className="text-xs text-gray-500 mt-1">
                2.5-Seater • 
              </p>

            </div>
          </div>

          {/* Quantity */}
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-6 border px-6 py-2 rounded-full">
              <button onClick={decrease} className="text-lg">-</button>
              <span className="text-lg font-semibold">{quantity}</span>
              <button onClick={increase} className="text-lg">+</button>
            </div>
          </div>

          {/* Total */}
          <p className="mt-6 font-bold text-xl text-center">
            Total: ₹{product.price * quantity}
          </p>

        </div>

        {/* Bottom Button */}
        <div className="p-6 border-t">
          <button className="w-full bg-green-700 text-white py-3 rounded-xl text-lg">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}