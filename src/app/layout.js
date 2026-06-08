import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

import ToastProvider from './toast-provider'

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Study-Nook",
    template: "%s | Study-Nook",
  },
  description: "Find and book study rooms easily",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${josefinSans.className}  h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
         <ToastProvider>
        {children}
        <Footer></Footer>
        </ToastProvider></body>
    </html>
  );
}
