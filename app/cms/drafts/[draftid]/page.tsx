"use client";
import SingleBlogViewerClient from "@/components/SingleBlogViewerClient";
import { Blog } from "@/lib/prismaClient";
import { useEffect, useState } from "react";

export default function Draft({
	params,
}: {
	params: Promise<{ draftid: string }>;
}) {
	const [blog, setBlog] = useState<Blog | undefined>(undefined);

	useEffect(() => {
		async function getDraft() {
			try {
				const draftId = Number((await params).draftid);
				const response = await fetch(
					`http://localhost:3000/api/draft/${draftId}`,
					{
						headers: {
							session: localStorage.getItem("sesId")!,
						},
					},
				);
				const blog = (await response.json()).draft;

				setBlog(blog);
			} catch (err) {}
		}

		getDraft();
	}, []);

	return <SingleBlogViewerClient blog={blog}></SingleBlogViewerClient>;
}
