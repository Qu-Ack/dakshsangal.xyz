import { Suspense } from "react";
import BlogsViewers from "@/components/BlogsViewer";
import { Blog } from "@/lib/prismaClient";

function BlogsLoading() {
	return <div>Loading blogs...</div>;
}

function BlogsError({ error }: { error: Error }) {
	return (
		<div className="text-red-500">
			<h2>Error loading blogs</h2>
			<p>{error.message}</p>
		</div>
	);
}

async function BlogsList() {
	try {
		const response = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog`, {
			next: { revalidate: 60 },
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch blogs: ${response.status}`);
		}

		const blogs: Blog[] = (await response.json()).blogs;

		if (!blogs || blogs.length === 0) {
			return <div className="p-3">No blogs found.</div>;
		}

		return <BlogsViewers blogs={blogs} />;
	} catch (error) {
		return (
			<BlogsError
				error={
					error instanceof Error ? error : new Error("Unknown error occurred")
				}
			/>
		);
	}
}

export default function Blogs() {
	return (
		<Suspense fallback={<BlogsLoading />}>
			<BlogsList />
		</Suspense>
	);
}
