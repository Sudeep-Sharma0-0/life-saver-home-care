import Image from "next/image";

export default function Service(props) {
  return (
    <section className="service col-span-1 flex flex-col items-center gap-2 p-2 relative">
      <Image
        src={props.image}
        width={50}
        height={25}
        alt={props.alt}
        className="mb-2"
      />
      <h4 className="text-xl leading-5 font-medium">{props.title}</h4>
      <p className="mt-2 leading-4">{props.desc}</p>
    </section>
  );
}
