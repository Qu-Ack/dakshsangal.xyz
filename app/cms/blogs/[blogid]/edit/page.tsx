"use client";
import { Blog } from "@/lib/prismaClient";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import { useEffect, useState } from "react";

export default function EditBlog({
	params,
}: {
	params: Promise<{ blogid: string }>;
}) {
	const [blog, setBlog] = useState<Blog | undefined>(undefined);
	const [blogId, setBlogId] = useState<number | undefined>();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [updating, setUpdating] = useState(false);
	const [updateError, setUpdateError] = useState("");
	const [updateSuccess, setUpdateSuccess] = useState(false);

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: false,
			}),
			CodeBlockLowlight.configure({
				lowlight: createLowlight(common),
			}),
		],
		content: "",
	});

	useEffect(() => {
		async function getBlog() {
			setLoading(true);
			try {
				const blogId = Number((await params).blogid);
				setBlogId(blogId);
				const sesId = localStorage.getItem("sesId");
				if (!sesId) {
					setError("Not authenticated");
					return;
				}
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/${blogId}`,
					{
						headers: {
							session: sesId,
						},
					},
				);
				if (!response.ok) {
					throw new Error("Failed to fetch blog");
				}
				const data = await response.json();
				console.log(data);
				setBlog(data.blog);
			} catch (err) {
				console.error(err);
				setError("Error loading blog");
			} finally {
				setLoading(false);
			}
		}
		getBlog();
	}, [params]);

	useEffect(() => {
		if (editor && blog?.content) {
			editor.commands.setContent(blog.content);
		}
	}, [blog, editor]);

	if (loading) {
		return <div>Loading editor...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	async function handleUpdate() {
		setUpdating(true);
		setUpdateError("");
		setUpdateSuccess(false);

		try {
			const sesId = localStorage.getItem("sesId");
			if (!sesId) {
				setUpdateError("Not authenticated");
				return;
			}

			if (!blogId) {
				setUpdateError("Blog ID is missing");
				return;
			}

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_DOMAIN}/api/blog/${blogId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						session: sesId,
					},
					body: JSON.stringify({
						content: editor?.getHTML(),
						title: blog?.title,
					}),
				},
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || "Failed to update blog");
			}

			const data = await response.json();
			console.log(data);
			setUpdateSuccess(true);

			setTimeout(() => setUpdateSuccess(false), 3000);
		} catch (err) {
			console.error(err);
			setUpdateError("Failed to update blog");
		} finally {
			setUpdating(false);
		}
	}

	return (
		<>
			<input
				className="p-3 font-bold text-4xl text-yellow-300"
				type="text"
				placeholder="Title"
				value={blog?.title}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
					setBlog({ ...blog!, title: e.target.value });
				}}
				disabled={updating}
			/>
			<EditorContent editor={editor} className={updating ? "opacity-50" : ""} />
			<div className="flex items-center">
				<button
					type="submit"
					onClick={handleUpdate}
					className="p-3 hover:bg-gray-300 hover:text-black hover:cursor-pointer m-3"
					disabled={updating}
				>
					{updating ? "Updating..." : "Update"}
				</button>
				{updateError && (
					<span className="text-red-500 ml-2">{updateError}</span>
				)}
				{updateSuccess && (
					<span className="text-green-500 ml-2">
						Blog updated successfully!
					</span>
				)}
			</div>
		</>
	);
}
