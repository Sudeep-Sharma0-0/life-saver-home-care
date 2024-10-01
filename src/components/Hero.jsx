import Link from "next/link";
import "./hero.css";
import "./button.css";
import Image from "next/image";

export default function Hero() {
  return (
    <div id="hero" className="p-3 flex flex-col-reverse items-center gap-x-16 gap-y-8">
      <section id="hero-text" className="flex flex-col gap-y-5">
        <p className="text-center flex flex-col gap-y-1">
          <span className="text-5xl text-center font-semibold">Just like your own.</span>
          <br />
          <span>
            Empowering independence, one home at a time. Your trusted partner
            in personalized home health care.
          </span>
        </p>
        <div className="flex justify-center gap-x-16">
          <button className="hero-btn">
            <Link href="/contact">Contact</Link>
          </button>
          <button className="hero-btn">
            <Link href="/register">Apply</Link>
          </button>
        </div>
      </section>
      <section id="hero-image">
        <div class="img-wrapper">
          <Image
            src="/images/hero-banner.jpg"
            width={220}
            height={100}
            alt="Life Saver Home Care"
          />
        </div>
      </section>
    </div>
  );
}
