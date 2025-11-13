import React from "react";
import Title from "../components/Title";

import NewsletterBox from "../components/NewsletterBox";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl text-center pt-12 border-t border-gray-200"
      >
        <Title text1={"ABOUT"} text2={"US"}></Title>
      </motion.div>

      <div className="my-16 flex flex-col md:flex-row items-center gap-16 px-6 lg:px-12">
        <motion.img
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          src={assets.SBE_About}
          className="w-full md:max-w-[550px] rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
          alt="Our Team Working"
        />
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col justify-center gap-8 md:w-3/5 text-gray-700 leading-relaxed"
        >
          <p className="text-lg">
            We are dreamers, innovators, and creators—united by a passion for
            excellence in the world of electronics. Our journey began with a
            simple idea: to redefine what’s possible in digital commerce. Today,
            we stand as a testament to bold vision and relentless execution,
            bringing cutting-edge technology directly to your fingertips. Every
            challenge we face fuels our drive to deliver exceptional products
            and results.
          </p>
          <p className="text-lg">
            At our core, we believe in the power of collaboration and customer
            focus. Our team is a diverse tapestry of talent, where creativity
            meets technical expertise to craft solutions that inspire and
            empower your digital life. Whether it’s through the latest gadgets,
            thoughtful design, or unparalleled online service, we’re committed
            to making a lasting impact on how you experience technology.
          </p>
          <b className="text-gray-900 text-2xl mt-4">Our Mission</b>
          <p className="text-lg">
            To empower and inspire through accessible, high-quality electronics.
            We’re on a mission to break barriers, elevate digital experiences,
            and create opportunities that transform lives. By blending
            innovation with integrity, we strive to build a future where
            progress knows no limits, one device at a time.
          </p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-2xl py-8 text-center"
      >
        <Title text1={"WHY"} text2={"CHOOSE US"}></Title>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-base mb-24 px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="bg-white border border-gray-200 rounded-xl p-10 flex flex-col gap-5 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
        >
          <b className="text-xl text-gray-900">
            Uncompromising Quality Assurance:
          </b>
          <p className="text-gray-600">
            We don't just meet industry standards—we redefine them. Every
            electronic product, every component, and every detail undergoes
            rigorous testing and quality checks to ensure unparalleled
            excellence. When you choose us, you choose uncompromising quality
            that powers your life and stands the test of time.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="bg-white border border-gray-200 rounded-xl p-10 flex flex-col gap-5 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
        >
          <b className="text-xl text-gray-900">Seamless Convenience</b>
          <p className="text-gray-600">
            Your time is precious, and we respect that. With intuitive website
            navigation, secure payment gateways, and lightning-fast delivery, we
            make sure you get the electronics you need—when and how you need
            them. No complications, just a smooth, enjoyable shopping experience
            from start to finish.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="bg-white border border-gray-200 rounded-xl p-10 flex flex-col gap-5 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
        >
          <b className="text-xl text-gray-900">Exceptional Customer Service</b>
          <p className="text-gray-600">
            Your satisfaction is our ultimate priority. Our dedicated support
            team goes above and beyond to listen, assist, and delight. From
            expert product recommendations to swift after-sales support, we’re
            with you every step of the way—because your success and happiness
            with your new electronics are our success.
          </p>
        </motion.div>
      </div>
      <NewsletterBox></NewsletterBox>
    </div>
  );
};

export default About;
