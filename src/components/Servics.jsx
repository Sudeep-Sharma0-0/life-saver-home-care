"use client";

import Service from "./Service";
import { useState } from "react";
import "./service.css";

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
    title: "Medicine Delivery",
    image: "/images/delivery.svg",
    desc: "Convenient delivery of prescribed medicines right to your door.",
  },
  {
    title: "Medication Assistance",
    image: "/images/medicine.svg",
    desc: "Reliable assistance with administering medications, ensuring accurate dosage and prescriptions.",
  },
  {
    title: "Blood Sample Collection",
    image: "/images/blood-sample.svg",
    desc: "Hassle-free blood sample collection, ensuring safe and timely diagnostics.",
  },
  {
    title: "24/7 Service",
    image: "/images/anytime-service.svg",
    desc: "Round-the-clock availability for all your healthcare needs at any time of day or night.",
  },
];

const extendedDescriptions = [
  {
    title: 'Nursing Care',
    details: `Key services for in-home nursing services:
1. Clinical Skills: Wound care, medication management, and vital signs monitoring.
2. Patient Assessment: Evaluating patient conditions and needs accurately.
3. Compassion and Empathy: Emotional support for patients and families.
4. Time Management: Managing multiple patients and tasks efficiently.
5. Critical Thinking: Quick, informed decisions based on patient needs.`
  },
  {
    title: 'Baby Care',
    details: `Key baby care services:
1. Infant Care Knowledge: Newborn and infant care, including feeding, diapering, and sleep routines.
2. Health Monitoring: Recognizing signs of illness or distress.
3. First Aid and CPR: Certification in infant and child CPR.
4. Patience and Empathy: Calm, nurturing care for infants.`
  },
  {
    title: 'Physical Therapy',
    details: `Core physiotherapy services:
1. Patient Assessment: Evaluating mobility, strength, and functional limitations.
2. Exercise Prescription: Designing personalized exercise programs.
3. Pain Management: Understanding and alleviating pain.
4. Patient Education: Treatment plans, exercises, and self-care strategies.`
  },
  {
    title: 'Dietary Counseling',
    details: `Important services in dietary counseling:
1. Nutritional Knowledge: Understanding macronutrients, micronutrients, and dietary guidelines.
2. Personalized Meal Planning: Creating meal plans that fit individual health goals.
3. Communication Skills: Conveying nutritional advice clearly.
4. Behavior Change Strategies: Encouraging sustainable healthy habits.`
  },
  {
    title: 'Medical Escort',
    details: `Essential services provided for medical escorting:
1. Communication Skills: Explaining transportation plans and patient details.
2. Safety Awareness: Following proper safety protocols during transport.
3. First Aid and CPR: Certification to handle emergencies during transport.
4. Problem-Solving: Handling unexpected changes during patient transport.`
  },
  {
    title: 'Doctor On Call',
    details: `Key on call doctor services:
1. Telemedicine Proficiency: Using telehealth platforms for consultations.
2. Patient Assessment: Diagnosing based on virtual interaction.
3. Confidentiality: Adhering to privacy laws during virtual consultations.
4. Problem-Solving: Making quick decisions based on virtual assessments.`
  },
  {
    title: 'Medicine Delivery',
    details: `Key features of medicine delivery:
1. Pharmaceutical Knowledge: Understanding medications, dosages, and side effects.
2. Customer Service: Addressing patient inquiries with empathy.
3. Logistics Management: Coordinating efficient delivery routes and schedules.
4. Patient Education: Providing information about medication usage.`
  },
  {
    title: 'Medication Assistance',
    details: `Benifits of medication assistance:
1. Attention to Detail: Ensuring accurate dosages and prescriptions.
2. Time Management: Scheduling medication administration efficiently.
3. Compassion and Empathy: Providing emotional support during treatment.
4. Regulatory Knowledge: Adhering to laws for medication administration.`
  },
  {
    title: 'Blood Sample Collection',
    details: `Key sample collection services:
1. Technical Proficiency: Mastery of venipuncture and capillary collection techniques.
2. Patient Comfort: Minimizing anxiety and discomfort during procedures.
3. Hygiene and Safety Practices: Ensuring sterile environments for sample collection.
4. Communication: Clearly explaining the process to patients.`
  },
  {
    title: '24/7 Service',
    details: `Core competencies for 24/7 services:
1. Adaptability: Adjusting to patient needs at any hour.
2. Crisis Management: Handling emergencies effectively.
3. Compassion: Providing emotional support at all times.
4. Time Management: Prioritizing tasks to manage urgent care efficiently.`
  }
];


function ServiceDialog({ service, isOpen, onClose }) {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg mx-auto shadow-lg">
        <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
        <p className="text-left mb-4 whitespace-pre-line">{service.details}</p>
        <button
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (serviceTitle) => {
    const extendedService = extendedDescriptions.find(
      (service) => service.title === serviceTitle
    );
    setSelectedService(extendedService);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedService(null);
  };

  return (
    <div
      id="services"
      className="text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-[#f9f9f9]"
    >
      <h3 className="my-3 col-span-1 sm:col-span-2 lg:col-span-4 text-4xl font-medium relative text-[#0b59a0] w-full">
        Our Services
        <span className="block h-1 w-48 bg-[#0b59a0] rounded mt-2 mx-auto"></span>
      </h3>

      {services.map(service => (
        <Service
          key={service.title}
          title={service.title}
          image={service.image}
          desc={service.desc}
          onClick={() => openDialog(service.title)}
        />
      ))}

      <ServiceDialog
        service={selectedService}
        isOpen={isDialogOpen}
        onClose={closeDialog}
      />
    </div>
  );
}
