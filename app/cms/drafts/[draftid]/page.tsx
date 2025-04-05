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
					`${process.env.NEXT_PUBLIC_DOMAIN}/api/draft/${draftId}`,
					{
						headers: {
							session: localStorage.getItem("sesId")!,
						},
					},
				);
				const blog = (await response.json()).draft;

				setBlog(blog);
			} catch (err) {
				console.log(err);
			}
		}

		getDraft();
	}, [params]);

	return <SingleBlogViewerClient blog={blog}></SingleBlogViewerClient>;
}
