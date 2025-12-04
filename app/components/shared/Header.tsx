"use client";

import { useEffect, useState } from "react";
import Navbar from "./Navbar"

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky w-full mx-auto px-2 md:px-6  top-0 flex justify-between py-2 items-center z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/60 backdrop-blur-md shadow-md  " 
          : "bg-transparent"
      }`}
    >
     <div className="w-full max-w-7xl  mx-auto ">
     <Navbar />
     </div>
    </header>
  );
}

export default Header;