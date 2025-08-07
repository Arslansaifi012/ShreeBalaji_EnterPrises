import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="mt-40">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 container mx-auto px-4 text-sm">
        <div>
          <img src={assets.logo} className="mb-5 w-32" alt="company logo" />
          <p className="w-full md:w-2/3">
            Unlock the extraordinary and embrace a life without limits. Imagine
            waking up every day to endless possibilities, where every moment is
            a chance to create, inspire, and conquer. This is your time—bold,
            vibrant, and unstoppable. Dare to dream bigger.
          </p>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>+91-123456789</li>
            <li>contact@forever.co.in</li>
          </ul>
        </div>
      </div>
      <div>
        <hr className="border border-gray-200" />
        <p className="py-5 tex-sm text-center">
          Copyright 2025@forever.com - All Right Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
