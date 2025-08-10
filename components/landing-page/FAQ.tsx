"use client";

import React, { useState } from "react";
import { AnimatedGradientText } from "../magicui/animated-gradient-text";
import SpotlightCard from "../ui/spotlight-card";
import {
  ChevronDown,
  HelpCircle,
  MessageCircle,
  Shield,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
// import ContactFormModal from "./ContactFormModal";

interface FAQItem {
  question: string;
  answer: string;
  icon: React.ReactNode;
}

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const faqData: FAQItem[] = [
    {
      question: "How does AI image generation work?",
      answer:
        "Our AI image generator uses advanced machine learning models to create images from text descriptions. Simply enter your prompt, and our system will generate high-quality images based on your specifications. You can customize various parameters like style, aspect ratio, and quality settings.",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      question: "What formats are supported?",
      answer:
        "We support multiple Image formats including jpg, png and webp and mp4 for videos. Our AI video generator can create videos in various resolutions. All generated content are optimized for web viewing and can be downloaded instantly.",
      icon: <MessageCircle className="h-5 w-5" />,
    },
    {
      question: "Is my data secure and private?",
      answer:
        "Absolutely! We take data security seriously. All your generated content is stored securely, and we never share your personal information or generated content with third parties. Our platform uses industry-standard encryption to protect your data.",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      question: "How many images/videos can I generate?",
      answer:
        "The number of generations depends on your subscription plan. Hobby users get limited generations per month, while premium plans offer almost unlimited generations. Check our pricing section for detailed limits.",
      icon: <HelpCircle className="h-5 w-5" />,
    },
    {
      question: "Can I use the generated content commercially?",
      answer:
        "Yes! All content generated through our platform comes with full commercial usage rights. You can use the images and videos for business purposes, marketing materials, and commercial projects without any additional licensing fees.",
      icon: <Shield className="h-5 w-5" />,
    },
    // {
    //   question: "What if I'm not satisfied with the results?",
    //   answer: "We offer a satisfaction guarantee. If you're not happy with your generated content, you can regenerate it at no additional cost. Our AI models continuously improve, and we're always working to provide better results.",
    //   icon: <HelpCircle className="h-5 w-5" />
    // }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-gradient-to-br from-purple-50 to-pink-50 via-zinc-50 via-50% border-y-4 border-purple-400/20 h-full py-22 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.9)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.9)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />

      <div className="text-center flex flex-col items-center justify-center relative z-10">
        <AnimatedGradientText className="text-6xl">
          <span>FAQ</span>
        </AnimatedGradientText>

        <h1 className="text-3xl font-bold text-zinc-700 mt-8">
          Frequently Asked Questions
        </h1>
        <p className="max-w-3xl px-10 text-center pt-2">
          Find answers to common questions about our AI-powered image and video
          generation platform.
        </p>
      </div>

      <div className="w-full max-w-4xl px-10 pt-20 space-y-4">
        {faqData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 1 }}
          >
            <SpotlightCard
              key={index}
              className="transition-all border-2 hover:border-purple-400/30"
              spotlightSize={400}
              spotlightOpacity={0.1}
              glowEffect
              glowSize={200}
              glowOpacity={0.2}
              gradientColor="rgb(147, 51, 234)"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left focus:outline-none"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-purple-500/10 p-2">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-zinc-800">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-zinc-600 transition-transform duration-200",
                      openIndex === index && "rotate-180"
                    )}
                  />
                </div>
              </button>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300 ease-in-out",
                  openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-6">
                  <div className="border-t border-zinc-200 pt-4">
                    <p className="text-zinc-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-16 px-10">
        <p className="text-zinc-600 mb-4">
          Still have questions? We&apos;re here to help!
        </p>
        <button
          // onClick={() => setIsContactModalOpen(true)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Support
        </button>
        {/* {isContactModalOpen && <ContactFormModal isOpen={true} />} */}
      </div>
    </section>
  );
};

export default FAQ;
