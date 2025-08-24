"use client";

import { useState, useEffect } from "react";
import Card from "./Card";

export default function CardCarousel() {
  const cardData = [
    {
      url: "/background.svg",
      alt: "night sky full of stars",
      quote: "A night full of stars",
      background: "#010214",
    },
    {
      url: "/ocean.jpg",
      alt: "ocean",
      quote: "the pacific",
      background: "#585856",
    },
    {
      url: "/solitude.jpg",
      alt: "solitude",
      quote: "the man",
      background: "#2d2620",
    },
    {
      url: "/roses.jpg",
      alt: "roses",
      quote: "roses",
      background: "#96804e",
    },
  ];

  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    setCurrent(Math.floor(Math.random() * cardData.length));
  }, []);

  useEffect(() => {
    if (current !== null) {
      document.body.style.backgroundColor = cardData[current].background;
    }
  }, [current]);

  function setNext() {
    setCurrent((prev) =>
      prev === null ? 0 : prev < cardData.length - 1 ? prev + 1 : 0,
    );
  }

  function setPrevious() {
    setCurrent((prev) =>
      prev === null
        ? cardData.length - 1
        : prev > 0
          ? prev - 1
          : cardData.length - 1,
    );
  }

  if (current === null) return null;

  return (
    <div className="h-[100%]">
      <Card
        alt={cardData[current].alt}
        url={cardData[current].url}
        quote={cardData[current].quote}
      />
      <div className="flex w-full mt-8 justify-between">
        <button
          onClick={setNext}
          className="pt-1 pb-1 pl-3 pr-3 hover:bg-gray-200 hover:cursor-pointer hover:text-black"
        >
          Next
        </button>
        <button
          className="pt-1 pb-1 pl-3 pr-3 hover:bg-gray-200 hover:cursor-pointer hover:text-black"
          onClick={setPrevious}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
