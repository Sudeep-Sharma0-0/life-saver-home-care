import "./services.css";
import Service from "./Service";

const services = [
  {
    title: "Nursing Care",
    image: "/images/nursing-home.svg",
    desc: "Professional in-home nursing services to provide medical assistance and support.",
  },
  {
    title: "Baby Care",
    image: "/images/baby-care.svg",
    desc: "Specialized baby care services ensuring the well-being of your little ones.",
  },
  {
    title: "Physical Therapy",
    image: "/images/physical-therapy.svg",
    desc: "Effective in-home physical therapy to help restore movement, and improve mobility.",
  },
  {
    title: "Dietary Counseling",
    image: "/images/diet-plan.svg",
    desc: "Expert dietary counseling to support healthy eating habits and nutritional plans for better health.",
  },
  {
    title: "Medical Escort",
    image: "/images/escort.svg",
    desc: "Compassionate medical escort services to safely transport you or your loved ones to healthcare appointments.",
  },
  {
    title: "Doctor On Call",
    image: "/images/doctor.svg",
    desc: "Access to experienced doctors at any time, with virtual consultations for your medical needs.",
  },
  {
    title: "Medication Delivery",
    image: "/images/delivery.svg",
    desc: "Convenient delivery of prescribed medications right to your door.",
  },
  {
    title: "Medication Assistance",
    image: "/images/medicine.svg",
    desc: "Reliable assistance with administering medications, ensuring accurate dosage and prescriptions.",
  },
  {
    title: "Blood Sampling",
    image: "/images/blood-sample.svg",
    desc: "Hassle-free blood sample collection, ensuring safe and timely diagnostics.",
  },
  {
    title: "24/7 Service",
    image: "/images/anytime-service.svg",
    desc: "Round-the-clock availability for all your healthcare needs at any time of day or night.",
  },
];

export default function Services() {
  return (
    <div id="services" className="text-center grid grid-cols-2 auto-rows-max gap-2 p-2">
      <h3 className="my-6 col-span-2 text-4xl font-medium relative">Our Services</h3>
      {services.map(service => {
        return (
          <Service
            title={service.title}
            image={service.image}
            desc={service.desc} />
        );
      })}
    </div>
  );
}
