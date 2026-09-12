import type { Metadata } from "next";
import { Public_Sans, Patrick_Hand } from "next/font/google";
import "./globals.css";

const publicSans = Public_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-public-sans",
  fallback: ["system-ui", "Arial", "sans-serif"],
});

const plannerHand = Patrick_Hand({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-planner-hand",
});

export const metadata: Metadata = {
  title: "Capmit",
  description: "Preventive workload decision support for university students.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${publicSans.variable} ${plannerHand.variable}`}>
      <body>{children}</body>
    </html>
  );
}
