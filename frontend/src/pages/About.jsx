import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"}></Title>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          src={assets.about_img}
          className="w-full md:max-w-[450px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            We are dreamers, innovators, and creators—united by a passion for
            excellence. Our journey began with a simple idea: to redefine what’s
            possible. Today, we stand as a testament to bold vision and
            relentless execution. Every challenge we face fuels our drive to
            deliver exceptional results.
          </p>
          <p>
            At our core, we believe in the power of collaboration. Our team is a
            diverse tapestry of talent, where creativity meets expertise to
            craft solutions that inspire. Whether it’s through cutting-edge
            technology, thoughtful design, or unparalleled service, we’re
            committed to making a lasting impact.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            To empower and inspire. We’re on a mission to break barriers,
            elevate experiences, and create opportunities that transform lives.
            By blending innovation with integrity, we strive to build a future
            where progress knows no limits.
          </p>
        </div>
      </div>
      <div className="text-xl py-5">
        <Title text1={"WHY"} text2={"CHOOSE US"}></Title>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            We don't just meet standards—we redefine them. Every product, every
            service, and every detail undergoes rigorous testing to ensure
            excellence. When you choose us, you choose uncompromising quality
            that stands the test of time.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience</b>
          <p className="text-gray-600">
            Your time is precious, and we respect that. With seamless processes,
            user-friendly solutions, and hassle-free experiences, we make sure
            you get what you need—when and how you need it. No complications,
            just results.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Your satisfaction is our priority. Our dedicated team goes above and
            beyond to listen, assist, and delight. From first contact to final
            delivery, we’re with you every step of the way—because your success
            is our success.
          </p>
        </div>
      </div>
      <NewsletterBox></NewsletterBox>
    </div>
  );
};

export default About;
