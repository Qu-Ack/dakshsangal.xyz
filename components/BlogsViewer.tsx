import { Blog } from "@/lib/prismaClient";
import Link from "next/link";

export default function BlogsViewers({ blogs }: { blogs: Blog[] | null }) {
  return (
    <div className="w-[100%] min-h-[70vh] p-3 mt-10">
      {blogs!.map((blog) => {
        return <BlogPreviewCard key={blog.Id} blog={blog}></BlogPreviewCard>;
      })}
    </div>
  );
}

function BlogPreviewCard({ blog }: { blog: Blog }) {
  const formattedDate = new Date(blog.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link
      href={`/blogs/${blog.Id}`}
      className="w-[100%] min-h-[20%] flex flex-col md:flex-row justify-between p-3 hover:bg-red-800 hover:border hover:cursor-pointer border-b-amber-100 border-b m-3"
    >
      <div className="flex flex-col md:hidden w-full">
        <div className="flex items-center gap-2">
          <p className="text-sm">{blog.Id}.</p>
          <p className="text-yellow-300 font-semibold">{blog.title}</p>
        </div>
        <p className="italic text-sm mt-1 text-right">{formattedDate}</p>
      </div>

      <div className="hidden md:flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <p>{blog.Id}.</p>
          <p className="text-yellow-300 font-semibold">{blog.title}</p>
        </div>
        <p className="italic">{formattedDate}</p>
      </div>
    </Link>
  );
}
