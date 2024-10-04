"use client";

import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

export default function Top() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className={`z-50 fixed bottom-24 right-5 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <button
        onClick={scrollToTop}
        className="p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-500"
        aria-label="Scroll to top"
      >
        <FaArrowUp size={24} />
      </button>
    </div>
  );
}
