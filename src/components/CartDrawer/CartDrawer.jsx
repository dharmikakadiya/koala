import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import axios from "axios";

export default function CartDrawer({ isOpen, onClose, items = [] }) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cartSuggestions")
      .then((res) => setSuggestions(res.data))
      .catch((err) =>
        console.error("Error fetching cart suggestions:", err)
      );
  }, []);

  const getImageUrl = (imgString) => {
    if (!imgString) return "";
    if (imgString.startsWith("http")) return imgString;
    return new URL(`../../assets/${imgString}`, import.meta.url).href;
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-50 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[450px] bg-[#f8f8f6] z-50 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 flex flex-col`}
      >
        {/* HEADER */}
        <div className="flex justify-between px-6 py-5 border-b">
          <h2 className="font-bold">
            {items.length === 0
              ? "Your Cart is Empty"
              : `Your Cart (${items.length})`}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* BODY */}
        <div className="p-6 flex-1 overflow-y-auto">

          {items.length > 0 ? (
            <div className="space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex gap-4 border-b pb-4">
                  <img
                    src={
                      item.img?.startsWith("http")
                        ? item.img
                        : getImageUrl(item.img)
                    }
                    className="w-20 h-20"
                  />

                  <div>
                    <h3>{item.title}</h3>
                    <p>₹{item.price}</p>
                    <p>Qty: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {suggestions.map((item) => (
                <div key={item.id}>
                  <img
                    src={getImageUrl(item.image)}
                    className="w-full"
                  />
                  <p>{item.title}</p>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
}