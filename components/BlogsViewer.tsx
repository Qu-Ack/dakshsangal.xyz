import { Blog } from "@/lib/prismaClient";
import Link from "next/link";

export default function BlogsViewers({ blogs }: { blogs: Blog[] }) {
	return (
		<div className="w-[100%] min-h-[70vh] p-3 mt-10">
			{blogs.map((blog) => {
				return <BlogPreviewCard key={blog.Id} blog={blog}></BlogPreviewCard>;
			})}
		</div>
	);
}

function BlogPreviewCard({ blog }: { blog: Blog }) {
	return (
		<Link
			href={`/blogs/${blog.Id}`}
			className="w-[100%] min-h-[20%] flex justify-between p-3 hover:bg-red-800 hover:border hover:cursor-pointer border-b-amber-100 border-b m-3"
		>
			<p>Blog Number: {blog.Id}</p>
			<p className="text-yellow-300">
				<strong>{blog.title} </strong>
			</p>
			<p>{blog.publishedAt.toString()}</p>
		</Link>
	);
}
