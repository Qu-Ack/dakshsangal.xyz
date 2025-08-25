"use client";
import { useColor } from "@/contexts/ColorContext";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Nav() {
  const [clicked, setClicked] = useState(false);
  const { color } = useColor();

  return (
    <div className="flex p-3 justify-between items-center w-[100%] min-h-[8vh]">
      <ul className="hidden md:flex gap-3">
        <li>
          <Link href={"/"} className="link">
            Daksh Sangal
          </Link>
        </li>
        <li>
          <Link
            href={"https://www.linkedin.com/in/daksh-sangal-529b10243/"}
            className="link"
          >
            Linkedin
          </Link>
        </li>
        <li>
          <Link href={"https://www.github.com/Qu-Ack"} className="link">
            Github
          </Link>
        </li>
      </ul>
      <ul className="gap-3 md:flex hidden">
        <li>
          <Link href={"/blogs"} className="link">
            Blogs
          </Link>
        </li>
        <li>
          <Link href={"/projects"} className="link">
            Projects
          </Link>
        </li>
        <li>
          <Link
            href={
              "https://drive.google.com/drive/folders/1alaFfcBFG5c_ztaP_6P8queN8Bz9LNOY?usp=sharing"
            }
            className="link"
          >
            Resume
          </Link>
        </li>
      </ul>
      <div className="w-[100%] flex justify-between md:hidden">
        <Link href={"/"} className="link md:hidden">
          Daksh Sangal
        </Link>
        <button className="link md:hidden" onClick={() => setClicked(!clicked)}>
          <Menu></Menu>
        </button>
      </div>

      {clicked && (
        <div
          className="absolute top-0 left-0 h-screen w-screen flex flex-col justify-center items-center"
          style={{ backgroundColor: color }}
        >
          <button
            className="absolute top-4 right-4"
            onClick={() => setClicked(!clicked)}
          >
            <X></X>
          </button>
          <ul className="text-center flex flex-col gap-2 text-xl">
            <li>
              <Link
                href={"https://www.linkedin.com/in/daksh-sangal-529b10243/"}
                className="link"
                onClick={() => setClicked(!clicked)}
              >
                Linkedin
              </Link>
            </li>
            <li>
              <Link
                href={"https://www.github.com/Qu-Ack"}
                className="link"
                onClick={() => setClicked(!clicked)}
              >
                Github
              </Link>
            </li>
            <li>
              <Link
                href={"/blogs"}
                className="link"
                onClick={() => setClicked(!clicked)}
              >
                Blogs
              </Link>
            </li>
            <li>
              <Link
                href={"/projects"}
                className="link"
                onClick={() => setClicked(!clicked)}
              >
                Projects
              </Link>
            </li>
            <li>
              <Link
                href={
                  "https://drive.google.com/drive/folders/1alaFfcBFG5c_ztaP_6P8queN8Bz9LNOY?usp=sharing"
                }
                className="link"
                onClick={() => setClicked(!clicked)}
              >
                Resume
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
