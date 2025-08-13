"use client";
import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import SpotlightCard from "../ui/spotlight-card";
import { Image, Video, Sparkles, Eye } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const Examples = () => {
  const exampleImages = [
    {
      id: 1,
      src: "https://replicate.delivery/yhqm/LhahE53ikx7ROteqIZ7Bgzc9wIoS76oQU8WLPPeUiCL9BiemA/out-0.webp",
      category: "Sport",
      prompt: "womens street skateboarding final in Paris Olympics 2024",
    },
    {
      id: 2,
      src: "https://replicate.delivery/yhqm/eGnzS3AVsry6VCfRTZEvI7aIe7Vdp2WzCgzfeWLHhGbz2P0bC/out-0.webp",
      category: "Fantasy",
      prompt: "a tiny astronaut hatching from an egg on the moon",
    },
    {
      id: 3,
      src: "https://replicate.delivery/yhqm/jg3hiwcxfD2IaSemC8KFWrTEfZc55GnDKiKqkkYTncfnIZ6NB/out-0.webp",
      category: "Animals",
      prompt: "a cat holding a sign that says hello world",
    },
  ];

  const exampleVideos = [
    {
      id: 1,
      src: "https://replicate.delivery/xezq/iY9PbAFJN2LJOBx1imI08Bhz4lJX1ZHBf5WakE1JGNtfKHfpA/tmp8ai_03z8.mp4",
      category: "Google veo 3",
      prompt: "gorilla riding a moped through busy italian city",
    },
    {
      id: 2,
      src: "https://replicate.delivery/xezq/ClgDLn4vlLosCtQeNCBMfAFxFefS9CwjWr6XkppFrQ2saYoTB/tmp4csnp1gw.mp4",
      category: "Seedance pro",
      prompt:
        "The cyclist passes through dappled light under a bridge as the entire city gradually wakes up.",
    },
  ];

  return (
    <section
      id="examples"
      className="w-full bg-gradient-to-br from-blue-50 to-purple-50 via-zinc-50 via-50% border-b-4 border-blue-400/20 h-full py-22 flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="text-center flex flex-col items-center justify-center relative z-10">
        <AnimatedGradientText className="text-6xl">
          <span>Examples</span>
        </AnimatedGradientText>

        <h1 className="text-3xl font-bold text-zinc-700 mt-8">
          See what AI can create for you.
        </h1>
        <p className="max-w-3xl px-10 text-center pt-2">
          Explore stunning examples of AI-generated images and videos created
          with our platform. Each piece showcases the power and creativity of
          our AI technology.
        </p>
      </div>

      {/* Image Examples */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl px-10 pt-20 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Image className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-zinc-800">
              AI Image Examples
            </h2>
            <Sparkles className="h-6 w-6 text-purple-500" />
          </div>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Discover the incredible range of images our AI can generate from
            simple text prompts
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {exampleImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="h-full p-6 transition-all border-2 hover:border-blue-300">
                <div className="flex h-full flex-col">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 to-purple-200/50"></div>
                    <div className="relative z-10 text-center p-4">
                      <img
                        src={image.src}
                        alt={image.prompt}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-zinc-800">
                        AI-Generated Image
                      </h3>
                      <span className="inline-flex items-center rounded-lg bg-blue-100 px-2 py-1 text-xs font-medium text-blue-800">
                        {image.category}
                      </span>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-zinc-500 font-mono bg-zinc-100 p-2 rounded border">
                        <span className="text-zinc-700 font-semibold">
                          Prompt:
                        </span>
                        &quot;{image.prompt}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Video Examples */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        viewport={{ once: true }}
        className="w-full max-w-7xl px-10 pt-20 relative z-10"
      >
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="h-8 w-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-zinc-800">
              AI Video Examples
            </h2>
            <Sparkles className="h-6 w-6 text-blue-500" />
          </div>
          <p className="text-zinc-600 max-w-2xl mx-auto">
            Experience the magic of AI-generated videos that bring your
            imagination to life
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {exampleVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <SpotlightCard className="h-full p-6 transition-all border-2 hover:border-purple-300">
                <div className="flex h-full flex-col">
                  <div className="aspect-video bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-200/10 to-blue-200/10"></div>
                    {/* <div className="relative z-10 text-center p-4">
                      <Video className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                      <p className="text-xs text-purple-700 font-medium">
                        AI Generated
                      </p>
                    </div> */}
                    <video
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      src={video.src}
                      className="h-full w-full"
                    />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-zinc-800">
                        AI-Generated Video
                      </h3>
                      <span className="inline-flex items-center rounded-lg bg-purple-100 px-2 py-1 text-xs font-medium text-purple-800">
                        {video.category}
                      </span>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-zinc-500 font-mono bg-zinc-100 p-2 rounded border">
                        <span className="font-semibold">Prompt:</span>&quot;
                        {video.prompt}&quot;
                      </p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-20 relative z-10"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 sm:rounded-2xl p-8 text-white max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Eye className="h-8 w-8" />
            <h3 className="text-2xl font-bold">Ready to Create Your Own?</h3>
          </div>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join now and get{" "}
            <span className="text-white font-bold">5 free credits</span> just
            for signing up! Limited time offer!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Start Creating
            </Link>
            <button className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
              View Gallery
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Examples;
