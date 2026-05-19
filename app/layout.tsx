import type { Metadata } from "next";
import { Inter, Exo_2 } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],

  variable: "--font-inter",
});
const exo = Exo_2({
  subsets: ["latin"],
  variable: "--font-exo2",
});

export const metadata: Metadata = {
  title: "Mi App",
  description: "Proyecto Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${exo.variable}`}>
        {children}
      </body>
    </html>
  );
}
