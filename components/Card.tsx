import Image, { StaticImageData } from "next/image";

export default function Card(props: {
  quote: string;
  url: StaticImageData;
  alt: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div className="relative h-[35vh] w-[60vw] md:h-120 md:max-w-2xl object-cover rounded-lg shadow-md">
        <Image
          src={props.url}
          alt={props.alt}
          placeholder="blur"
          fill
          className="object-cover rounded-lg shadow-md"
          priority
        ></Image>
      </div>
      <div className="italic text-center text-sm">{props.quote}</div>
    </div>
  );
}
