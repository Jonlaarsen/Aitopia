import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-300 border-t-4 border-purple-400/20">
      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 col-span-2">
            <h3 className="text-xl font-bold text-white">Aitopia</h3>
            <p className="text-sm max-w-[20rem] text-zinc-400 leading-relaxed">
              AI-powered image and video generation platform. Create stunning
              content with the power of artificial intelligence.
            </p>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#features"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Pricing
                </a>
              </li>

              <li>
                <a
                  href="/dashboard"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#faq"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href={"https://replicate.com/bytedance/seedance-1-pro"}
                  className="text-zinc-400 hover:text-white transition-colors"
                >
                  API Reference
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-start items-center">
          <p className="text-sm text-zinc-400">
            © 2025 Aitopia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
