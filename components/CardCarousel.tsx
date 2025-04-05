"use client";

import { useState } from "react";
import { useEffect } from "react";
import Card from "./Card";

export default function CardCarousel() {
	const cardData = [
		{
			url: "/background.svg",
			alt: "night sky full of stars",
			quote:
				"I stare into the infinite night sky, wishing to sleep under them, wearing the stars like a blanket, free from all the worries",
			background: "#010214",
		},
		{
			url: "/twoface.jpg",
			alt: "twoface",
			quote:
				"Everyone is Everything, Everyone morphs into one another at one point or another, but how far are you willing to look ?",
			background: "#214442",
		},
		{
			url: "/cathedral.png",
			alt: "cathedral",
			quote:
				"The peircing light shines through the windows reflecting lighting the place as if some one intended it to be that way.",
			background: "#906d45",
		},
	];

	const [current, setCurrent] = useState(0);

	useEffect(() => {
		document.body.style.backgroundColor = cardData[current].background;
	}, []);

	function setNext() {
		if (current < cardData.length - 1) {
			setCurrent(current + 1);
			document.body.style.backgroundColor = cardData[current + 1].background;
		} else {
			setCurrent(0);
			document.body.style.backgroundColor = cardData[0].background;
		}
	}
	function setPrevious() {
		if (current > 0) {
			setCurrent(current - 1);
			document.body.style.backgroundColor = cardData[current - 1].background;
		} else {
			setCurrent(cardData.length - 1);
			document.body.style.backgroundColor =
				cardData[cardData.length - 1].background;
		}
	}

	return (
		<div className="h-[100%]">
			<Card
				alt={cardData[current].alt}
				url={cardData[current].url}
				quote={cardData[current].quote}
			></Card>
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
