import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ShopContext, currency, delivery_fee, backendUrl } from "./ShopContext";

export const ShopContextProvider = (props) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  {
    /*------------------------Add To Cart -------------------------------------*/
  }
  const addToCart = async (itemId, size) => {
    // if (!size) {
    //   toast.error("Select Product Size");
    //   return;
    // }
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size]++;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }
    setCartItems(cartData);

    {
      /*------------------------Add To Cart backend API -------------------------------------*/
    }
    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          { headers: { token } }
        );
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error adding to cart");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    return totalCount;
  };

  {
    /*------------------------Update Cart Quantity -------------------------------------*/
  }
  const updateQuantity = async (itemId, size, quantity) => {
    if (quantity < 0) return;

    let cartData = structuredClone(cartItems);
    if (!cartData[itemId]) return;

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    {
      /*------------------------update cart quantity with backend API -------------------------------------*/
    }
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          { headers: { token } }
        );
        // console.log(response.data);
      } catch (error) {
        console.log(error);
        toast.error(error.response?.data?.message || "Error updating cart");
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (!itemInfo) continue;

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += itemInfo.price * cartItems[items][item];
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching products");
    }
  };

  const getUserCart = async (userToken) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        { headers: { token: userToken } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData || {});
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Error fetching cart");
    }
  };

  useEffect(() => {
    getProductsData();

    // Load cart if token exists on initial load
    if (token) {
      getUserCart(token);
    }
  }, [token]);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
