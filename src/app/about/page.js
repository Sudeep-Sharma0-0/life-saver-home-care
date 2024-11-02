"use client";
import TestimonialsSlider from "@/components/Testimonies";

export default function About() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-10 bg-gray-100">
      {/* About Us Section */}
      <section className="w-full max-w-4xl text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-8">
          At Life Saver Home Care, we are dedicated to providing compassionate, professional home care services that make a difference in the lives of those we serve.
        </p>
      </section>

      {/* Our Mission and Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-4">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            To deliver personalized care that enhances the quality of life for our clients, ensuring they remain safe, independent, and comfortable in their own homes.
          </p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
          <p className="text-gray-600">
            To become the most trusted home care provider, recognized for our dedication to compassionate care and innovative solutions.
          </p>
        </div>
      </section>

      {/* Word from Our Founder */}
      <section className="w-full max-w-4xl mt-10 px-4">
        <div className="bg-white p-8 shadow-lg rounded-lg flex flex-col md:flex-row items-center md:items-start text-left">
          {/* Image of Founder */}
          <img
            src="/images/founder.jpeg"
            alt="Founder"
            className="w-40 h-40 rounded-full object-cover mb-6 md:mb-0 md:mr-8"
          />
          {/* Founder's Word */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">A Word from Our Founder</h2>
            <p className="text-gray-600 mb-4">
              "At Life Saver Home Care, we believe that everyone deserves to receive the care they need in the comfort of their own home. Our journey began with a simple goal: to bring love, respect, and compassion into the homes of those who need it most. We are proud to see our vision grow into a dedicated team of professionals who share our passion for exceptional care."
            </p>
            <p className="text-gray-800 font-semibold">- Bipin Hamal, Founder & CEO</p>
          </div>
        </div>
      </section>

      {/* IT Head Section */}
      <section className="w-full max-w-4xl mt-10 px-4">
        <div className="bg-white p-8 shadow-lg rounded-lg text-left">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Meet Our IT Head</h2>
          <p className="text-gray-600 mb-4">
            Our IT team ensures that our technology infrastructure is state-of-the-art, enabling seamless care coordination and secure communication between our team and clients. With a background in health-tech and innovation, Somnath is at the forefront of integrating digital solutions to enhance the efficiency of our services.
          </p>
          <p className="text-gray-800 font-semibold">- Somnanth Poudel, IT Head</p>
        </div>
      </section>

    {/*<TestimonialsSlider />*/}
    </main>
  );
}
