import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Aitopia",
  description: "AI image and video generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.variable} `}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
