import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  useEffect(() => {
    const bestProduct = products.filter(
      (product) => product.bestseller === true
    );
    setBestSeller(bestProduct.slice(0, 15));
  }, [products]);
  return (
    <div className="my-10">
<div className="text-center py-16 px-6 my-10 bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-sm ">
  {/* Title Section */}
  <div className="mb-6">
    <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
        BEST
      </span>{" "}
      SELLERS
    </h2>
  </div>

  {/* Description */}
  <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
    Looking for quality you can trust? Our{" "}
    <span className="font-semibold text-blue-600">Top-Rated Picks</span> are
    customer favorites that combine exceptional quality with unbeatable value.
  </p>

  <p className="max-w-2xl mx-auto mt-4 text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
    Loved by thousands, these essential electronics are built to last and
    designed to perform — offering the perfect blend of{" "}
    <span className="text-green-600 font-medium">innovation</span> and{" "}
    <span className="text-green-600 font-medium">reliability</span>.
  </p>

  <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg md:text-xl text-gray-900 font-semibold">
    ✨ Now waiting for you: Discover the best-selling, most
    highly-reviewed tech that stands the test of time!
  </p>

  {/* Decorative line */}
  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-500 mx-auto mt-8 rounded-full"></div>
</div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            image={product.image}
            price={product.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
