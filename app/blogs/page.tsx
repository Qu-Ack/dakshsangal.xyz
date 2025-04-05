import BlogsViewers from "@/components/BlogsViewer";
import { Blog } from "@/lib/prismaClient";

export default async function Blogs() {
	const response = await fetch(`http://localhost:3000/api/blog`);

	if (!response.ok) {
		console.log(response);
		throw new Error(`Failed to fetch blogs: ${response.status}`);
	}

	const blogs: Blog[] = (await response.json()).blogs;
	console.log(blogs);

	if (!blogs || blogs.length === 0) {
		return <div className="p-3">No blogs found.</div>;
	}

	return <BlogsViewers blogs={blogs} />;
}
