import React, { useState } from "react";
import { assets } from "../assets/assets";
import { backendUrl } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("speaker");
  // const [subCategory, setSubCategory] = useState("Topwear");
  const [bestseller, setBestseller] = useState(false);
  // const [sizes, setSizes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      // formData.append("subCategory", subCategory);
      // formData.append("sizes", JSON.stringify(sizes));

      // Only append images if they exist
      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const config = {
        headers: {
          token: token,
          "Content-Type": "multipart/form-data",
        },
      };

      console.log(formData);
      

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        config
      ); // Use backendUrl

      // console.log(response.data);

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset form
        setName("");
        setDescription("");
        setPrice("");
        setCategory("speaker");
        // setSubCategory("Topwear");
        setBestseller(false);
        // setSizes([]);
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error.response?.data?.message || "Failed to add product");
    } finally {
      setIsSubmitting(false);
    }    

  }; // onSubmitHandler





  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col w-full item-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>
        <div className="flex gap-3">
          <label htmlFor="image1">
            <img
              className="w-20"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              hidden
              id="image1"
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              hidden
              id="image2"
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              hidden
              id="image3"
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              hidden
              id="image4"
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full py-2 px-3 max-w-[500px] border rounded"
          type="text"
          placeholder="Type here"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product description</p>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className="w-full py-2 px-3 max-w-[500px] border rounded"
          placeholder="Write content here"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="spekaer">spekaer</option>
            <option value="headphones">headphones</option>
            <option value="airpods">airpods</option>
          </select>
        </div>

        <div className="">
        <p className="mb-2">Price</p>
        <input
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className="w-full py-2 px-3 max-w-[500px] border rounded"
          type="number"
          placeholder="Set Price"
          required
        />
      </div>

        <div>
          {/* <p className="mb-2">Sub Category</p> */}
          {/* <select
            onChange={(e) => setSubCategory(e.target.value)}
            value={subCategory}
            className="w-full px-3 py-2 border rounded"
            required
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select> */}
        </div>
        {/* <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 border rounded sm:w-[120px]"
            type="number"
            placeholder="25"
            required
            min="0"
          />
        </div> */}
      </div>
      <div>
        {/* <p className="mb-2">Product Sizes</p> */}
        {/* <div className="flex gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() =>
                setSizes((prev) =>
                  prev.includes(size)
                    ? prev.filter((item) => item !== size)
                    : [...prev, size]
                )
              }
            >
              <p
                className={`${
                  sizes.includes(size) ? "bg-pink-300" : "bg-slate-200"
                } px-3 py-1 cursor-pointer rounded`}
              >
                {size}
              </p>
            </div>
          ))}
        </div> */}
      </div>
      <div className="flex gap-2 mt-2 items-center">
        <input
          onChange={(e) => setBestseller(e.target.checked)}
          checked={bestseller}
          type="checkbox"
          id="bestseller"
          className="w-4 h-4"
        />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>
      <button
        type="submit"
        className={`w-28 py-3 mt-4 cursor-pointer bg-black text-white rounded ${
          isSubmitting ? "opacity-50" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Adding..." : "ADD"}
      </button>
    </form>
  );
};
export default Add;
