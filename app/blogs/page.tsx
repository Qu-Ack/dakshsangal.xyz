import BlogsViewers from "@/components/BlogsViewer";
import { Blog } from "@/lib/prismaClient";

export default async function Blogs() {
	const response = await fetch("http://localhost:3000/api/blog");
	const blogs: Blog[] = (await response.json()).blogs;

	return <BlogsViewers blogs={blogs}></BlogsViewers>;
}
