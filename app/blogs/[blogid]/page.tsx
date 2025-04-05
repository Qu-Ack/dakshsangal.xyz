import SingleBlogViewer from "@/components/SingleBlogViewer";

export default async function SingleBlog({
	params,
}: {
	params: Promise<{ blogid: string }>;
}) {
	const blogid = Number((await params).blogid);

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/${blogid}`,
	);
	const blog = (await response.json()).blog;

	return <SingleBlogViewer blog={blog}></SingleBlogViewer>;
}
