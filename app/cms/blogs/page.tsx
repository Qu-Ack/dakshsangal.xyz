"use client";
import { Blog } from "@/lib/prismaClient";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
export default function CmsDrafts() {
	const router = useRouter();
	const [blogs, setDrafts] = useState<Blog[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		async function getDrafts() {
			setLoading(true);
			setError("");
			try {
				const sesId = localStorage.getItem("sesId");
				if (!sesId) {
					router.push("/login");
					return;
				}
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog`,
					{
						headers: {
							session: sesId,
							"Content-Type": "application/json",
						},
					},
				);

				if (!response.ok) {
					throw new Error("Failed to fetch blogs");
				}

				const data = await response.json();
				console.log(data);
				setDrafts(data.blogs || []);
			} catch (err) {
				console.error(err);
				setError("Failed to load blogs. Please try again.");
			} finally {
				setLoading(false);
			}
		}
		getDrafts();
	}, [router]);

	if (loading) {
		return (
			<div className="w-[100%] min-h-[70vh] p-3 mt-10">Loading blogs...</div>
		);
	}

	if (error) {
		return <div className="w-[100%] min-h-[70vh] p-3 mt-10">{error}</div>;
	}

	return <DraftViewers blogs={blogs}></DraftViewers>;
}

function DraftViewers({ blogs }: { blogs: Blog[] }) {
	if (blogs.length === 0) {
		return (
			<div className="w-[100%] min-h-[70vh]">
				No blogs found. Create a new blog to get started.
			</div>
		);
	}

	return (
		<div className="w-[100%] min-h-[70vh]">
			{blogs.map((blog) => {
				return (
					<DraftCardPreviewer key={blog.Id} blog={blog}></DraftCardPreviewer>
				);
			})}
		</div>
	);
}

function DraftCardPreviewer({ blog }: { blog: Blog }) {
	const [deleting, setDeleting] = useState(false);
	const [deleteError, setDeleteError] = useState("");
	const [deleted, setDeleted] = useState(false);
	const [publishing, setPublishing] = useState(false);
	const [publishError, setPublishError] = useState("");
	const [published, setPublished] = useState(false);

	async function handleDelete(blogId: number) {
		setDeleting(true);
		setDeleteError("");
		try {
			const sesId = localStorage.getItem("sesId");
			if (!sesId) {
				setDeleteError("Not authenticated");
				return;
			}
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/${blogId}`,
				{
					method: "DELETE",
					headers: {
						session: sesId,
					},
				},
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to delete blog");
			}
			const data = await response.json();
			console.log(data);
			setDeleted(true);
		} catch (err) {
			console.error(err);
			setDeleteError("Failed to delete blog");
		} finally {
			setDeleting(false);
		}
	}

	async function handlePublish(blogId: number) {
		setPublishing(true);
		setPublishError("");
		try {
			const sesId = localStorage.getItem("sesId");
			if (!sesId) {
				setPublishError("Not authenticated");
				return;
			}
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/${blogId}/archive`,
				{
					method: "PUT",
					headers: {
						session: sesId,
					},
				},
			);
			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to publish blog");
			}
			const data = await response.json();
			console.log(data);
			setPublished(true);
		} catch (err) {
			console.error(err);
			setPublishError("Failed to publish blog");
		} finally {
			setPublishing(false);
		}
	}

	if (deleted || published) {
		return null;
	}

	return (
		<>
			<Link
				href={`/blogs/${blog.Id}`}
				className="w-[100%] min-h-[20%] flex justify-between p-3 hover:bg-red-800 hover:border hover:cursor-pointer border-b-amber-100 border-b"
			>
				<p>Blog Number: {blog.Id}</p>
				<p className="text-yellow-300">
					<strong>{blog.title} </strong>
				</p>
				<p>{blog.publishedAt.toString()}</p>
			</Link>
			<div className="flex gap-8 p-3 m-3">
				<Link href={`/cms/blogs/${blog.Id}/edit`} className="link">
					edit
				</Link>
				<button
					className="link hover:cursor-pointer"
					onClick={() => handleDelete(blog.Id)}
					disabled={deleting || publishing}
				>
					{deleting ? "deleting..." : "delete"}
				</button>
				<button
					className="link hover:cursor-pointer"
					onClick={() => handlePublish(blog.Id)}
					disabled={publishing || deleting}
				>
					{publishing ? "archiving..." : "archive"}
				</button>
				{deleteError && (
					<span className="text-red-500 ml-2">{deleteError}</span>
				)}
				{publishError && (
					<span className="text-red-500 ml-2">{publishError}</span>
				)}
			</div>
		</>
	);
}
