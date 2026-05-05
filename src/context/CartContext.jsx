import { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import API_URL from "../Api_path";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  

  // ✅ FIX 1: useCallback makes fetchCart stable — no infinite loops
  //not use usecallback
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/cart`);
      setCart(res.data || []);
    } catch (err) {
      console.log("Fetch Cart Error:", err);
    }
  };



  // ✅ FIX 2: Always re-fetch fresh cart from server before checking for existing item
  //    This prevents stale cart state causing duplicates instead of qty++
  const addToCart = async (product) => {
    try {
      const res = await axios.get(`${API_URL}/cart`);
      const freshCart = res.data;

      const existingItem = freshCart.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        await axios.patch(`${API_URL}/cart/${existingItem.id}`, {
          qty: existingItem.qty + 1,
        });
      } else {
        // ✅ FIX 3: Don't spread ...product (avoids id field collision with json-server)
        await axios.post(`${API_URL}/cart`, {
          productId: product.id,
          title: product.title,
          price: product.price,
          rate: product.rate,
          colors: product.colors,
          selectedColor: product.selectedColor,
          qty: 1,
        });
      }

      setCart((prevCart) => {
        const itemInCart = prevCart.find(
          (item) => item.productId === product.id
        );
        if (itemInCart) {
          return prevCart.map((item) =>
            item.productId === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          );
        } else {
          return [
            ...prevCart,
            {
              id: Date.now(),
              productId: product.id,
              title: product.title,
              price: product.price,
              rate: product.rate,
              colors: product.colors,
              selectedColor: product.selectedColor,
              qty: 1,
            },
          ];
        }
      });

    } catch (err) {
      console.log("Add to Cart Error:", err);
    }
  };

  // ✅ Increase Qty
  const increaseQty = useCallback(async (item) => {
    try {
      await axios.patch(`${API_URL}/cart/${item.id}`, {
        qty: item.qty + 1,
      });
      fetchCart();
    } catch (err) {
      console.log("Increase Error:", err);
    }
  }, [fetchCart]);

  // ✅ Decrease Qty
  const decreaseQty = useCallback(async (item) => {
    try {
      if (item.qty > 1) {
        await axios.patch(`${API_URL}/cart/${item.id}`, {
          qty: item.qty - 1,
        });
      } else {
        await axios.delete(`${API_URL}/cart/${item.id}`);
      }
      fetchCart();
    } catch (err) {
      console.log("Decrease Error:", err);
    }
  }, [fetchCart]);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increaseQty, decreaseQty, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
}