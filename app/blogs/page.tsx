import BlogsViewers from "@/components/BlogsViewer";

export default async function Blogs() {
  try {
    const response = await fetch("http://localhost:3000/api/blog", {
      cache: "no-store",
    });
    if (!response.ok) {
      console.log(response);
    }
    const data = await response.json();
    const blogs = data.blogs;
    return <BlogsViewers blogs={blogs} />;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return <div>Failed to load blogs. Please try again later.</div>;
  }
}
