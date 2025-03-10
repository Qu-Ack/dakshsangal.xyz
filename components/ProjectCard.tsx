export type Project = {
  title: string;
  description: string;
  tech: string[];
  background: string;
  show: boolean;
  images: string[];
  backendRepo: string;
  frontendRepo?: string;
  liveLink: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const {
    images,
    title,
    description,
    tech,
    backendRepo,
    frontendRepo,
    liveLink,
  } = project;

  // Define a consistent container height
  const imageContainerHeight = "h-120"; // You can adjust this value

  // Improved grid layout logic
  let gridClasses = "";
  if (images.length === 1) {
    gridClasses = "grid grid-cols-1";
  } else if (images.length === 2) {
    gridClasses = "grid grid-cols-2 gap-4";
  } else if (images.length === 3) {
    gridClasses = "grid grid-cols-3 gap-4 md:grid-cols-12";
  }

  return (
    <div className="flex flex-col overflow-hidden max-w-[100%] mx-auto text-white">
      <div className={`${gridClasses} w-full ${imageContainerHeight}`}>
        {images.map((img, index) => {
          let extraClasses = "h-full";

          if (images.length === 3) {
            if (index === 0) {
              extraClasses += " md:col-span-6 md:row-span-2";
            } else {
              extraClasses += " md:col-span-6";
            }
          }

          return (
            <div key={index} className={`${extraClasses} overflow-hidden`}>
              <img
                src={img}
                alt={`${title} - image ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          );
        })}
      </div>
      <div className="pt-4 flex flex-col gap-3">
        <h1 className="text-xl font-bold text-white text-center">{title}</h1>
        <p className="text-gray-300 text-sm text-center italic">
          {description}
        </p>
        <div className="mt-1 flex justify-center items-center flex-col">
          <ul className="flex flex-wrap gap-2">
            {tech.map((item, idx) => (
              <li
                key={idx}
                className="px-2 py-1 border text-gray-200 text-xs rounded-full"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex gap-3 mt-3 flex justify-center">
          <a
            href={backendRepo}
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Main Code Repository
          </a>
          {frontendRepo && (
            <a
              href={backendRepo}
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Code Repository
            </a>
          )}
          <a
            href={liveLink}
            className="link"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Live
          </a>
        </div>
      </div>
    </div>
  );
}
