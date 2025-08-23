import Image from "next/image";

export default function Card(props: {
  quote: string;
  url: string;
  alt: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <Image
        src={props.url}
        alt={props.alt}
        height={120}
        width={1536}
        priority
        className="h-120 max-w-2xl object-cover rounded-lg shadow-md"
      />
      <div className="italic text-center text-sm">{props.quote}</div>
    </div>
  );
}
