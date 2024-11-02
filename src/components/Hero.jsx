"use client"
import Link from "next/link";
import "./button.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const images = [
    "/images/image1.webp", // Replace with your actual image paths
    "/images/kathmandu.webp",
    "/images/image2.webp",
    "/images/image3.webp",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <div className="w-screen p-6 flex flex-col-reverse items-center gap-8 md:flex-row md:justify-between md:p-10 bg-gradient-to-br from-green-600 to-gray-100 relative">
      <section className="flex flex-col gap-5 max-w-md">
        <p className="text-center flex flex-col gap-1">
          <span className="text-5xl font-semibold">Just like your own.</span>
          <br />
          <span>
            Empowering independence, one home at a time. Your trusted partner
            in personalized home health care.
          </span>
        </p>
        <div className="flex justify-center gap-8">
          <Link href="/staffs">
            <button type="button" className="flex items-center gap-x-1 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              <svg width="35" height="30" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2H4V0H3v2H1.5A1.5 1.5 0 0 0 0 3.5v8A1.5 1.5 0 0 0 1.5 13h12a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 13.5 2H12V0h-1zM3 6a2 2 0 1 1 4 0 2 2 0 0 1-4 0m-.618 4.618a2.927 2.927 0 0 1 5.236 0l.33.658A.5.5 0 0 1 7.5 12h-5a.5.5 0 0 1-.447-.724zM9 6h3V5H9zm0 3h3V8H9z" fill="#000" /><path d="M15 14v1H0v-1z" fill="#000" /></svg>
              Get Staff
            </button>
          </Link>
          <Link href="/apply">
            <button type="button" className="flex gap-x-1 items-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              <svg width="35" height="30" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g stroke="#212121" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round"><path d="M20 16.5V21a1 1 0 0 1-1 1h-3.25M20 8V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v18a1 1 0 0 0 1 1h3" stroke-linejoin="round" /><path d="M8 8h7m-3.5 14L20 11.5M8 12h4" /></g></svg>
              Get a Job
            </button>
          </Link>
        </div>
      </section>
      <section className="relative w-full overflow-hidden rounded-2xl" style={{ height: '400px' }}>
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100" : "opacity-0"}`}
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <Image
              src={src}
              width={720}
              height={400}
              alt="Life Saver Home Care"
              className="object-cover w-full h-full"
            />
          </div>
        ))}
      </section>
    </div>
  );
}
