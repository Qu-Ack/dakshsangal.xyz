export default function Card(props: {
  quote: string;
  url: string;
  alt: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <img
        src={props.url}
        alt={props.alt}
        className="h-[40vh] w-[60vw] md:h-120 md:max-w-2xl object-cover rounded-lg shadow-md"
      />
      <div className="italic text-center text-sm">{props.quote}</div>
    </div>
  );
}
