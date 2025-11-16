import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { backendUrl, ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import { currency } from "../context/ShopContext.jsx";
import RelatedProducts from "../components/RelatedProducts.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart } = useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");

  // ------------------------
  // ⭐ FRONTEND REVIEW SYSTEM
  // ------------------------
  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReview = async() => {
  
    if (!rating) {
      alert("Please select a rating");
      return;
    }
   try {

     const responce = await axios.post(backendUrl + "/api/product/review/reviews", {productId, rating, comment}, {headers:{Authorization:`Bearer ${localStorage.getItem("token")}`}}) ;

     console.log(responce )

    if(!responce.data.success){
      toast.error(responce.data.message)
    } ;

    const newReview = {
      rating,
      comment,
      user: "User",
      date: new Date().toISOString(),
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");

   } catch (error) {
    console.log('reviewError', error.message) ;
    toast.error(error.message) ;
   }

  };

  const fetchReviews = async() =>{
    try {
       const res = await axios.get(backendUrl + `/api/product/review/get/${productId}`,);
      //  console.log(res)

    if (res.data.success) {
      setReviews(res.data.reviews);
    }
      
    } catch (error) {
      console.log("fetchReiewError", error.message)
    }
  }

 

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


  useEffect(()=>{
    fetchReviews() ;
  },[productId]);

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
      
      {/* PRODUCT SECTION */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
        
        {/* IMAGES */}
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          
          {/* Thumbnails */}
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {Array.isArray(productData.image) &&
              productData.image.map((item, index) => (
                <img
                  src={item}
                  key={index}
                  className={`w-[24%] sm:w-full sm:mb-3 cursor-pointer ${
                    mainImage === item ? "border-2 border-blue-500" : ""
                  }`}
                  onClick={() => setMainImage(item)}
                />
              ))}
          </div>

          {/* Main Image */}
          <div className="w-full sm:w-[80%] h-auto max-h-[600px] rounded-lg shadow-md overflow-hidden">
            <img className="w-full h-auto object-contain" src={mainImage} />
          </div>
        </div>

        {/* DETAILS */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>

          {/* Static stars */}
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_icon} className="w-3.5" />
            <img src={assets.star_dull_icon} className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

          {/* ADD TO CART */}
          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 mt-5 text-sm"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original Product</p>
            <p>Cash on Delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* DESCRIPTION + REVIEW */}
      <div className="mt-20">

        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews ({reviews?.length})</p>
        </div>

        {/* DESCRIPTION BOX */}
        <div className="border px-6 py-6 text-sm text-gray-500">
          <p>
            An e-commerce website is an online platform that allows customers to
            buy and sell products and services over the internet.
          </p>
        </div>

        {/* WRITE REVIEW */}
        <div className="border p-5 mt-5 rounded">
          <h3 className="font-medium text-lg mb-2">Write a Review</h3>

          {/* Rating stars */}
          <div className="flex gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={`cursor-pointer text-xl ${
                  star <= rating ? "text-yellow-500" : "text-gray-400"
                }`}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="border p-3 w-full rounded"
            rows="3"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          ></textarea>

          <button
            onClick={submitReview}
            className="bg-black text-white px-5 py-2 mt-3 rounded"
          >
            Submit Review
          </button>
        </div>

        {/* SHOW REVIEWS */}
        <div className="mt-8">
          <h3 className="font-medium text-lg mb-4">Customer Reviews</h3>

          {reviews?.length === 0 && <p>No reviews yet.</p>}

          {reviews?.map((r, index) => (
    
            <div key={index} className="border p-4 rounded-md mb-3 bg-gray-50">
              <div className="flex gap-1 text-yellow-500">
                {"★".repeat(r.rating)}
                {"★".repeat(5 - r.rating).replaceAll("★", "☆")}
              </div>

              <p className="text-sm mt-1">{r.comment}</p>
              <h3>Name : <span className="text-sm mt-1">{r.userId?.name}</span></h3>

              <p className="text-xs text-gray-500 mt-1">
                {r.user} — {new Date(r.updatedAt).toDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED */}
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
