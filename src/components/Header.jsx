"use client";

import Image from "next/image";
import logo from "@/app/images/logo.png";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import "./header.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false); // Close the menu if click outside
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="text-xl relative" id="header">
      <nav className="border-gray-200 y-900 h-20 align-middle">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-0 relative h-full">
          <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src={logo} className="" alt="Lifesaver Logo" width={120} height={100} />
          </Link>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden"
            aria-controls="navbar-default"
            aria-expanded={isMenuOpen ? 'true' : 'false'}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="#0b59a0" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="1.86rem" height="2rem" viewBox="0 0 1216 1312">
                <path fill="#0b59a0" d="M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68" />
              </svg>
            )}
          </button>
          <div className={`${isMenuOpen ? 'block absolute top-full right-1 m-auto z-50 transition-all' : 'hidden'} md:block md:w-auto`} id="navbar-default">
            <ul className="lg:bg-transparent md:bg-transparent bg-[#0b59a0] relative font-medium flex flex-col p-4 md:p-0 mt-0 border border-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:border-gray-700">
              <li>
                <Link href="/" className="text-[#f9f9f9] md:text-black lg:text-black block px-1 py-2 rounded" aria-current="page" onClick={closeMenu}>Home</Link>
              </li>
              <li>
                <Link href="/staffs" className="text-[#f9f9f9] md:text-black lg:text-black block px-1 py-2 rounded" onClick={closeMenu}>Staff</Link>
              </li>
              <li>
                <Link href="/#services" className="text-[#f9f9f9] md:text-black lg:text-black block px-1 py-2 rounded" onClick={closeMenu}>Services</Link>
              </li>
              <li>
                <Link href="/#contact" className="text-[#f9f9f9] md:text-black lg:text-black block px-1 py-2 rounded" onClick={closeMenu}>Contact</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
