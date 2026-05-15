import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../Api_path";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ─── Page load pe db.json se cart fetch karo ──────────────────
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${API_URL}/cart`);
        const dbCart = Array.isArray(res.data) ? res.data : [];
        // db ka data local cart format mein convert karo
        setCart(
          dbCart.map((item) => ({
            id: item.productId,
            title: item.title,
            colorName: item.colorName,
            colorHex: item.colorHex,
            price: Number(item.price) || 0,
            image: item.image || "",
            quantity: Number(item.quantity) || 1,
          }))
        );
      } catch (err) {
        console.error("Cart fetch error:", err);
      }
    };
    fetchCart();
  }, []);

  // ─── Add To Cart ───────────────────────────────────────────────
  const addToCart = async (product, selectedVariant) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id && item.colorHex === selectedVariant.hex
      );
      if (existing) {
        return prev.map((item) =>
          item.id === product.id && item.colorHex === selectedVariant.hex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          colorName: selectedVariant.colorName,
          colorHex: selectedVariant.hex,
          price: selectedVariant.price,
          image: selectedVariant.images?.[0] || selectedVariant.image || product.img || "",
          quantity: 1,
        },
      ];
    });

    setIsCartOpen(true);

    // Save to db.json
    try {
      const res = await axios.get(`${API_URL}/cart`);
      const dbCart = res.data;

      const existingInDb = dbCart.find(
        (item) =>
          item.productId === product.id &&
          item.colorHex === selectedVariant.hex
      );

      if (existingInDb) {
        await axios.patch(`${API_URL}/cart/${existingInDb.id}`, {
          quantity: existingInDb.quantity + 1,
        });
      } else {
        await axios.post(`${API_URL}/cart`, {
          productId: product.id,
          title: product.title,
          colorName: selectedVariant.colorName,
          colorHex: selectedVariant.hex,
          price: selectedVariant.price,
          image: selectedVariant.images?.[0] || selectedVariant.image || product.img || "",
          quantity: 1,
        });
      }
    } catch (err) {
      console.error("Cart save error:", err);
    }
  };

  // ─── Remove From Cart ──────────────────────────────────────────
  const removeFromCart = async (id, colorHex) => {
    setCart((prev) =>
      prev.filter((item) => !(item.id === id && item.colorHex === colorHex))
    );

    try {
      const res = await axios.get(`${API_URL}/cart`);
      const dbCart = res.data;
      const itemInDb = dbCart.find(
        (item) => item.productId === id && item.colorHex === colorHex
      );
      if (itemInDb) {
        await axios.delete(`${API_URL}/cart/${itemInDb.id}`);
      }
    } catch (err) {
      console.error("Cart remove error:", err);
    }
  };

  // ─── Update Quantity ───────────────────────────────────────────
  const updateQuantity = async (id, colorHex, amount) => {
    let newQty = 0;

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id && item.colorHex === colorHex) {
          newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );

    try {
      const res = await axios.get(`${API_URL}/cart`);
      const dbCart = res.data;
      const itemInDb = dbCart.find(
        (item) => item.productId === id && item.colorHex === colorHex
      );
      if (itemInDb && newQty > 0) {
        await axios.patch(`${API_URL}/cart/${itemInDb.id}`, {
          quantity: newQty,
        });
      }
    } catch (err) {
      console.error("Cart update error:", err);
    }
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};