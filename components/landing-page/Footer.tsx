import React from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-zinc-900 text-zinc-300 border-t-4 border-purple-400/20">
      <div className="max-w-7xl mx-auto px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Aitopia</h3>
            <p className="text-sm text-zinc-400 leading-relaxed">
              AI-powered image and video generation platform. Create stunning content with the power of artificial intelligence.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-zinc-400 hover:text-white transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#faq" className="text-zinc-400 hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/dashboard" className="text-zinc-400 hover:text-white transition-colors">
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
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  API Reference
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-zinc-400 hover:text-white transition-colors">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-zinc-400">
            © 2024 Aitopia. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Status
            </a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Security
            </a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Blog
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
