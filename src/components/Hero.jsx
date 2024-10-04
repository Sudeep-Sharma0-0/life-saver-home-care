import Link from "next/link";
import "./button.css";
import Image from "next/image";

export default function Hero() {
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
          <Link href="/#contact">
            <button className="hero-btn">Contact</button>
          </Link>
          <Link href="/login">
            <button className="hero-btn">Apply</button>
          </Link>
        </div>
      </section>
      <section className="relative">
        <div className="img-wrapper">
          <Image
            src="/images/kathmandu.webp"
            width={720}
            height={300}
            alt="Life Saver Home Care"
            className="rounded-2xl object-cover"
          />
        </div>
      </section>
    </div>
  );
}
