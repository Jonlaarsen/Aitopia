"use client";
import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import SpotlightCard from "../ui/spotlight-card";
import { Code, Image, Palette, Zap } from "lucide-react";
import { motion } from "motion/react";

const Features = () => {
  return (
    <section
      id="features"
      className="w-full bg-gradient-to-br from-purple-50 to-pink-50 via-zinc-50 via-50% border-y-4 border-purple-400/20 h-full py-22 flex flex-col items-center justify-center overflow-hidden relative"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="text-center flex flex-col items-center justify-center relative z-10">
        <AnimatedGradientText className="text-6xl">
          <span>Features</span>
        </AnimatedGradientText>

        <h1 className="text-3xl font-bold text-zinc-700 mt-8">
          Check out our premium features.
        </h1>
        <p className="max-w-3xl px-10 text-center  pt-2">
          Our website offers a wide arrange of features to make your experience
          the right fit for your needs. Our Website has multiple different
          selection features to enchance your generated images and videos.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-6 px-0  sm:px-10 pt-10 sm:pt-20 relative z-10"
      >
        <div className=" grid grid-cols-1 sm:grid-cols-2 px-10">
          <div className="flex order-2 sm:order-1 flex-col gap-4">
            <SpotlightCard className="h-fit p-8 transition-all border-4">
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-primary/10 p-3">
                    <Image className="h-8 w-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium">AI Images</h3>
                    <div className="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm text-muted-foreground">
                      AI image generation
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    Experience an image generator that smoothly creates images
                    from your imagination. Write an advanced or simple prompt
                    and watch your text come to life.
                  </p>
                </div>
              </div>
            </SpotlightCard>
            <SpotlightCard
              className="h-fit p-8 transition-all border-4"
              multiSpotlight
              glowEffect
              gradientColor="rgb(99, 102, 241)"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-indigo-500/10 p-3">
                    <Zap
                      className="h-8 w-8 text-indigo-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-medium">AI videos</h3>
                    <div className="inline-flex items-center rounded-lg bg-indigo-500/10 px-3 py-1 text-sm text-indigo-500">
                      Ai video generator
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-muted-foreground">
                    Experience an video generator that smoothly creates videos
                    from your imagination. Write an advanced or simple prompt
                    and watch your text come to life.
                  </p>
                </div>
              </div>
            </SpotlightCard>
          </div>

          <div className="w-full order-1 sm:order-2 pb-10 sm:pb-0  h-auto flex flex-col items-center justify-center space-y-4">
            <h1 className="text-3xl sm:text-6xl font-extrabold bg-purple-500 text-white leading-tight uppercase px-6 py-2 skew-x-12  ">
              5 free credits!
            </h1>
            <h2 className="text-lg sm:text-2xl font-extrabold bg-amber-500 text-white leading-tight uppercase px-6 py-2 -skew-x-12 ">
              When signing up for free!
            </h2>
            <p className="text-sm sm:text-lg text-center font-semibold max-w-lg bg-gradient-to-bl from-amber-400/40 to-purple-400/40 text-zinc-800 p-4 rounded-2xl">
              5 credits can be used for image generation or a short video
              generation using top of the line AI models. <br /> We use google
              veo 3 and seedance for video generation. <br /> For image
              generation we use flux dev and flux fast
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Features;
