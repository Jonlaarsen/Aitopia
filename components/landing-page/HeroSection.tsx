import React from "react";
import { ThreeDMarquee } from "../ui/3d-marquee";
import { Button } from "../ui/button";
import Link from "next/link";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";

const images = [
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
];

const HeroSection = () => {
  return (
    <div className="relative  flex h-screen w-full  flex-col items-center justify-center overflow-hidden ">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-zinc-900 md:text-4xl lg:text-6xl">
        From Imagination to reality. One
        <AnimatedGradientText className="text-6xl mx-2">
          <span>prompt</span>
        </AnimatedGradientText>
        at a time.
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-900 font-semibold md:text-base">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore esse
        nisi.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4 ">
        <Link href="/login?state=signup">
          <Button
            className="bg-purple-500/80 hover:bg-purple-600 font-bold text-lg"
            size={"lg"}
          >
            Sign Up
          </Button>
        </Link>

        <Link
          href="faqs"
          className="text-zinc-800 font-medium text-lg underline underline-offset-4 decoration-purple-500 decoration-[2px] hover:scale-110"
        >
          Learn More
        </Link>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full via-white/50 from-purple-300/30 to-blue-300/40 bg-gradient-to-bl " />
      <ThreeDMarquee
        className="pointer-events-none absolute min-h-screen inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
};

export default HeroSection;
