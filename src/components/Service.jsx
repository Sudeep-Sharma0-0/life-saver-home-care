import Image from "next/image";

export default function Service({ title, image, desc, onClick }) {
  return (
    <section
      className="service col-span-1 flex flex-col items-center gap-2 p-2 border border-[#0b59a0] rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-200 w-full h-56 lg:w-48 lg:h-64"
      onClick={onClick}
    >
      <Image
        src={image}
        width={50}
        height={25}
        alt={title}
        className="mb-4"
      />
      <h4 className="text-xl font-medium text-center text-[#0b59a0] relative">
        {title}
        <span className="block h-0.5 w-24 bg-[#0b59a0] rounded mt-1 mx-auto"></span>
      </h4>
      <p className="mt-2 text-sm text-gray-600 text-center">{desc}</p>
    </section>
  );
}
