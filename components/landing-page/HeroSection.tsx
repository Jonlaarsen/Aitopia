"use client";
import React from "react";
import { ThreeDMarquee } from "../ui/3d-marquee";
import { Button } from "../ui/button";
import Link from "next/link";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

const images = [
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
  "https://img.freepik.com/free-vector/ai-technology-microchip-background-vector-digital-transformation-concept_53876-112222.jpg",
  "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1680783954745-3249be59e527?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YWklMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
  "https://images.unsplash.com/photo-1623410439361-22ac19216577?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGFpJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNuwWm6PKT-aIjnqC9BHRXf3e5L3XWDi1YbQ&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQfkfv_kZdOrsUTUgUzMm2Jq8x9wyKN06XHg&s",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAARuXgqcIQXH58Obrl5xFnHJM5huVog6_-g&s",
];

const HeroSection = () => {
  return (
    <div className="relative  flex h-screen w-full  flex-col items-center justify-center overflow-hidden ">
      <motion.h2
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold text-balance text-zinc-900 md:text-4xl lg:text-6xl"
      >
        From Imagination to reality, One
        <AnimatedGradientText className="text-4xl md:text-6xl mx-2">
          <span>prompt</span>
        </AnimatedGradientText>
        at a time.
      </motion.h2>
      <motion.h3
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="relative z-20 px-2 mx-auto max-w-2xl py-8 text-center text-base text-neutral-900 font-semibold md:text-base"
      >
        Bring your imagination to life with AI. <br /> Simply describe what you
        see in your mind, and our powerful image generator transforms your words
        into stunning, high-quality visuals!
      </motion.h3>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="relative z-20 flex flex-col items-center justify-center gap-4 pt-4 "
      >
        <Link href="/login?state=signup">
          <Button
            className="bg-purple-500 sm:bg-purple-500/80 hover:bg-purple-600 uppercase font-bold text-lg"
            size={"lg"}
          >
            {" "}
            <Sparkles strokeWidth={3} />
            Sign up now and get 5{" "}
            <span className="underline underline-offset-2">free</span> credits!
            <Sparkles strokeWidth={3} />
          </Button>
        </Link>

        <Link href="#faq">
          <Button
            variant={"outline"}
            className="text-purple-800  bg-transparent border-2 border-purple-500"
          >
            Learn More
          </Button>
        </Link>
      </motion.div>

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
