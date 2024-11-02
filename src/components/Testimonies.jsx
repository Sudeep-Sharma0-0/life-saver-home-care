import React, { useEffect, useState } from 'react';

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalSlides = 4; // Total number of slides (testimonials)

  // Function to update the slider position
  const updateSlider = (index) => {
    const slider = document.getElementById('testimonial-slider');
    slider.style.transform = `translateX(-${index * 100}%)`;
  };

  // Handling next and prev button clicks
  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % totalSlides); // Loop back to the first slide
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides); // Loop back to the last slide
  };

  // Updating the slider whenever the current index changes
  useEffect(() => {
    updateSlider(currentIndex);
  }, [currentIndex]);

  return (
    <section className="max-w-xl mx-auto mt-10 px-4 py-8">
      <h2 className="text-4xl font-semibold text-gray-800 text-center mb-8">What Our Clients Say</h2>

      <div className="relative overflow-hidden">
        {/* Testimonial slides */}
        <div
          id="testimonial-slider"
          className="flex transition-transform duration-700 ease-in-out"
          style={{ width: `${totalSlides * 100}%` }}
        >
          {/* Slide 1 */}
          <div className="min-w-full bg-white p-6 shadow-lg rounded-lg flex items-center flex-col md:flex-row">
            <img
              src="/client1.jpg"
              alt="Client 1"
              className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-600 mb-4 break-words">
                "The care and attention we've received from Life Saver Home Care has been exceptional. They truly go above and beyond to make sure my mother is comfortable and happy at home."
              </p>
              <p className="text-gray-800 font-semibold">- Narendra Sapkota</p>
            </div>
          </div>

          {/* Slide 2 */}
          <div className="min-w-full bg-white p-6 shadow-lg rounded-lg flex items-center flex-col md:flex-row">
            <img
              src="/client2.jpg"
              alt="Client 2"
              className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-600 mb-4 break-words">
                "I feel at ease knowing that my father is in good hands. The caregivers are kind, attentive, and professional. I couldn't ask for better service!"
              </p>
              <p className="text-gray-800 font-semibold">- Sandeep Shrestha</p>
            </div>
          </div>

          {/* Slide 3 */}
          <div className="min-w-full bg-white p-6 shadow-lg rounded-lg flex items-center flex-col md:flex-row">
            <img
              src="/client3.jpg"
              alt="Client 3"
              className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-600 mb-4 break-words">
                "Their team has been an incredible support for our family. They provide care with a level of compassion and professionalism that's hard to find."
              </p>
              <p className="text-gray-800 font-semibold">- Shanti Rauniyar</p>
            </div>
          </div>

          {/* Slide 4 */}
          <div className="min-w-full bg-white p-6 shadow-lg rounded-lg flex items-center flex-col md:flex-row">
            <img
              src="/client4.jpg"
              alt="Client 4"
              className="w-16 h-16 rounded-full object-cover mb-4 md:mb-0 md:mr-4"
            />
            <div className="text-center md:text-left">
              <p className="text-gray-600 mb-4 break-words">
                "Thanks to Life Saver Home Care, my grandparents can remain in their home and still get the daily help they need. We are so grateful!"
              </p>
              <p className="text-gray-800 font-semibold">- Sailesh Bastakoti</p>
            </div>
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-700 transition-colors"
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-700 transition-colors"
          aria-label="Next"
        >
          ›
        </button>
      </div>

      {/* Dots for slide indication */}
      <div className="flex justify-center mt-4">
        {[...Array(totalSlides)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 mx-1 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
