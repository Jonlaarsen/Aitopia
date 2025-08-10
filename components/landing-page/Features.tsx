"use client";
import React from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import SpotlightCard from "../ui/spotlight-card";
import { Code, Image, Palette, Sparkles, Zap } from "lucide-react";
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
        className="grid gap-6 md:grid-cols-2 px-10 pt-20 relative z-10"
      >
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
                Experience an image generator that smoothly creates images from
                your imagination. Write an advanced or simple prompt and watch
                your text come to life.
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
                <Zap className="h-8 w-8 text-indigo-500" strokeWidth={1.5} />
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
                Experience an video generator that smoothly creates videos from
                your imagination. Write an advanced or simple prompt and watch
                your text come to life.
              </p>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="h-fit p-8 transition-all border-4"
          spotlightBlur
          animated
          glowEffect
          spotlightSize={300}
          spotlightOpacity={0.2}
          glowSize={200}
          glowOpacity={0.3}
          gradientColor="rgb(244, 63, 94)"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-rose-500/10 p-3">
                <Palette className="h-8 w-8 text-rose-500" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-medium">Animated Spotlight</h3>
                <div className="inline-flex items-center rounded-lg bg-rose-500/10 px-3 py-1 text-sm text-rose-500">
                  Interactive Animation
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">
                Watch as the spotlight comes alive with smooth animations,
                creating an immersive experience that responds to user
                interaction in real-time.
              </p>
            </div>
          </div>
        </SpotlightCard>

        <SpotlightCard
          className="h-fit p-8 transition-all border-4"
          spotlightSize={300}
          spotlightOpacity={0.2}
          glowEffect
          glowSize={150}
          glowOpacity={0.2}
          gradientColor="rgb(34, 197, 94)"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-green-500/10 p-3">
                <Code className="h-8 w-8 text-green-500" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-medium">Custom Configuration</h3>
                <div className="inline-flex items-center rounded-lg bg-green-500/10 px-3 py-1 text-sm text-green-500">
                  Advanced Settings
                </div>
              </div>
            </div>
            <div className="mt-4">
              <p className="text-muted-foreground">
                Fully customizable spotlight with precise control over size,
                opacity, and glow effects to match your design requirements
                perfectly.
              </p>
            </div>
          </div>
        </SpotlightCard>
      </motion.div>
    </section>
  );
};

export default Features;
