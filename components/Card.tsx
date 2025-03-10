export default function Card(props: {
  quote: string;
  url: string;
  alt: string;
}) {
  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <img src={props.url} alt={props.alt} className="h-[100%] w-[100%]" />
      <div className="italic text-center">{props.quote}</div>
    </div>
  );
}
