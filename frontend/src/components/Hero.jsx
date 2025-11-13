import React from "react";
import { assets } from "../assets/assets";


const Hero = () => {

  return (
    <div className="flex flex-col sm:flex-row border bg-gray-50 rounded-xl shadow-lg overflow-hidden max-w-7xl mx-auto my-4">

      <div className="w-full sm:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="text-gray-800 max-w-md">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-2">
            <p className="w-8 h-[3px] bg-blue-500 rounded-full"></p>
            <p className="font-semibold text-sm tracking-widest uppercase text-blue-600">
              NEXT LEVEL GEAR
            </p>
          </div>
          
          {/* Main Headline */}
          <h1 className="font-sans font-extrabold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
            Experience the Future of Sound
          </h1>
          
          {/* Description (Optional, added for context) */}
          <p className="text-gray-600 mb-8 text-lg">
            Immerse yourself in crystal-clear audio. Explore our latest collection of headphones, speakers, and smart devices.
          </p>

          {/* Call to Action */}
          <button className="flex items-center gap-3 group px-6 py-3 bg-gray-800 text-white font-bold uppercase text-sm rounded-full shadow-lg hover:bg-blue-600 transition duration-300 transform hover:scale-105">
            <span>EXPLORE NEW TECH</span>
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>

      {/**Hero Right side (Image) */}
      <div className="w-full sm:w-1/2 overflow-hidden">
        <img 
          className="w-full h-full object-cover transition duration-500 ease-in-out hover:scale-105" 
          src={assets.SBE_banner} 
          alt="Featured new electronics gear" 
        />
      </div>
    </div>
  );
};

export default Hero;