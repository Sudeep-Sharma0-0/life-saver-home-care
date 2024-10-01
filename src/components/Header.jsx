import Image from "next/image";
import logo from "@/app/images/logo.png";
import Link from "next/link";
import "./header.css";

export default function Header() {
  return (
    <header className="py-2 px-16 text-xl" id="header">
      <nav className="flex justify-around items-center relative">
        <section id="header-logo">
          <Image
            src={logo}
            width={140}
            height={100}
            alt="Life Saver Home Care"
          />
        </section>
        <input className="menu-btn hidden invisible absolute" type="checkbox" id="menu-btn" />
        <label className="menu-icon hidden invisible absolute" htmlFor="menu-btn">
          <span className="navicon" />
        </label>
        <section id="header-links" className="">
          <ul id="nav-list" className="flex justify-between">
            <li className="nav-link mr-8">
              <Link href="/" className="relative">Home</Link>
            </li>
            <li className="nav-link mx-12">
              <Link href="#services" className="relative">Services</Link>
            </li>
            <li className="nav-link ml-8">
              <Link href="/contact" className="relative">Contact</Link></li></ul>
        </section>
        <section id="header-controls" className="">
          <button className="header-btn py-1 px-2 rounded-md transition ease-in-out delay-250">
            <Link href="login">Login</Link>
          </button>
        </section>
      </nav>
    </header>
  );
}
