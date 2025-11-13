import { createContext } from "react";

export const ShopContext = createContext();
export const currency = "₹";
export const delivery_fee = 10;
export const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default ShopContext;
