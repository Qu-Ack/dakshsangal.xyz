export type Project = {
  title: string;
  description: string;
  tech: string[];
  background: string;
  show: boolean;
  image: string;
  backendRepo: string;
  frontendRepo?: string;
  liveLink: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const {
    image,
    title,
    description,
    tech,
    backendRepo,
    frontendRepo,
    liveLink,
  } = project;

  return (
    <div className="flex flex-col overflow-hidden max-w-[100%] mx-auto text-white">
      <div className="w-full h-48 overflow-hidden">
        <img
          src={image}
          alt={`${title} preview`}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
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
        <div className="flex gap-3 mt-3 justify-center">
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
              href={frontendRepo}
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
