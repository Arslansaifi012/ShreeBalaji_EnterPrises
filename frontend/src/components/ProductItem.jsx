import React from "react";
import { Link } from "react-router-dom";
const currency = " ₹";

const ProductItem = ({ id, image, name, price }) => {
  return (
    <Link
      className="block bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden transform hover:-translate-y-0.5"
      to={`/product/${id}`}
    >
      <div className="w-full h-90 overflow-hidden">
        <img
          className="w-full h-full object-cover transition ease-in-out duration-500 group-hover:scale-105"
          src={
            image && image.length > 0
              ? image[0]
              : "https://placehold.co/600x288/E5E7EB/1F2937?text=Product+Image"
          }
          alt={name}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              "https://placehold.co/600x288/E5E7EB/1F2937?text=Product+Image";
          }}
        />
      </div>

      {/* Product Details Section: Uses consistent padding on all screen sizes */}
      <div className="p-4 text-gray-800">
        <p className="text-base font-semibold truncate mb-1" title={name}>
          {/* truncate: Ensures long names don't break the layout on small screens */}
          {name}
        </p>
        <p className="text-lg font-bold text-indigo-600">
          {currency}
          {price.toFixed(2)}{" "}
          {/* Assuming price is a number, formatted to 2 decimal places */}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
