"use client";
import { useEffect, useState } from "react";
import ProjectCard, { Project } from "./ProjectCard";

export default function ProjectCarousel() {
  const [current, setCurrent] = useState(0);

  const projectData: Project[] = [
    {
      title: "AI Ayurvedic Assistant",
      description:
        "Upload your image and get a detailed ayurvedic analysis, along with recommendations for better health based on ayurvedic science.",
      images: ["./background.png", "./background.png", "./background.png"],
      show: false,
      tech: ["golang", "gin router", "opencv", "python", "nextjs"],
      backendRepo: "https://www.github.com",
      liveLink: "https://www.github.com",
      background: "black",
    },
    {
      title: "SIDEHUB",
      description: "Upload Your SideProjects",
      images: ["./background.png", "./background.png"],
      show: false,
      tech: ["golang", "gin router", "opencv", "python", "nextjs"],
      backendRepo: "https://www.github.com",
      liveLink: "https://www.github.com",
      background: "black",
    },
  ];

  useEffect(() => {
    document.body.style.backgroundColor = projectData[current].background;

    return () => {
      document.body.style.backgroundColor = "black";
    };
  }, []);

  function handleNext() {
    if (current < projectData.length - 1) {
      setCurrent(current + 1);
      document.body.style.backgroundColor = projectData[current + 1].background;
    } else {
      setCurrent(0);
      document.body.style.backgroundColor = projectData[0].background;
    }
  }
  function handlePrevious() {
    if (current > 0) {
      setCurrent(current - 1);
      document.body.style.backgroundColor = projectData[current - 1].background;
    } else {
      setCurrent(projectData.length - 1);
      document.body.style.backgroundColor =
        projectData[projectData.length - 1].background;
    }
  }

  return (
    <div className="h-[100%]">
      <ProjectCard project={projectData[current]}></ProjectCard>
      <div className="flex w-full justify-between">
        <button
          onClick={handleNext}
          className="pt-1 pb-1 pl-3 pr-3 hover:bg-gray-200 hover:cursor-pointer hover:text-black"
        >
          Next
        </button>
        <button
          className="pt-1 pb-1 pl-3 pr-3 hover:bg-gray-200 hover:cursor-pointer hover:text-black"
          onClick={handlePrevious}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
