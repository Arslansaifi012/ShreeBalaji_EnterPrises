import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { currency } from "../context/ShopContext.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");

  const fetchProductData = useCallback(() => {
    try {
      const product = products.find((product) => product._id === productId);
      if (product) {
        setProductData(product);
        setMainImage(product.image[0]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  }, [productId, products]);

  useEffect(() => {
    fetchProductData();
  }, [fetchProductData]);

  if (loading) {
    return <div className="border-t pt-10">Loading...</div>;
  }

  if (!productData) {
    return <div className="border-t pt-10">Product not found</div>;
  }

  return (
    <div className="border-t pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* Product data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {Array.isArray(productData.image) &&
              productData.image.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  className={`w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer ${
                    mainImage === item ? "border-2 border-blue-500" : ""
                  }`}
                  alt={`Thumbnail ${index + 1}`}
                  onClick={() => setMainImage(item)}
                />
              ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%]">
            <img
              className="w-full h-auto"
              src={mainImage}
              alt={productData.name || "Product Image"}
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_icon} className="w-3 5" alt="" />
            <img src={assets.star_dull_icon} className="w-3 5" alt="" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          {/* <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-400 text-black" : ""
                  } `}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div> */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is availale on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/*Description & Review Section*/}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Review (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that allows customers to
            buy and sell products and services over the internet. It is a
            digital platform that enables businesses to sell their products or
            services to customers online.
          </p>
          <p>
            E-commerce websites typically display products or services along
            with their descriptions, images, and prices. Customers can browse
            through the website, add products to their cart, and proceed to
            checkout to complete the purchase.
          </p>
        </div>
      </div>
      {/* Display related products*/}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      ></RelatedProducts>
    </div>
  );
};

export default Product;
