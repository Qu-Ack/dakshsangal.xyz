"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Tiptap = () => {
	const [title, setTitle] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isDrafting, setIsDrafting] = useState(false);
	const [error, setError] = useState("");
	const router = useRouter();
	const [success, setSuccess] = useState("");

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				codeBlock: false,
			}),
			CodeBlockLowlight.configure({
				lowlight: createLowlight(common),
			}),
		],
		content: "hello, world!",
		immediatelyRender: false,
	});

	async function handleSubmit() {
		setError("");
		setSuccess("");
		setIsSubmitting(true);

		try {
			if (!editor || !title.trim()) {
				throw new Error("Title and content are required");
			}

			const response = await fetch("/api/blog", {
				method: "POST",
				body: JSON.stringify({
					content: editor.getHTML(),
					title: title,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || "Failed to submit post");
			}

			const data = await response.json();
			console.log(data);
			setSuccess("Post published successfully!");
			router.push("/");
		} catch (err) {
			console.error(err);
			setError(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		} finally {
			setIsSubmitting(false);
		}
	}

	async function handleDraft() {
		setError("");
		setSuccess("");
		setIsDrafting(true);

		try {
			if (!editor || !title.trim()) {
				throw new Error("Title and content are required");
			}

			const response = await fetch("/api/draft", {
				method: "POST",
				body: JSON.stringify({
					content: editor.getHTML(),
					title: title,
				}),
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				throw new Error(errorData.message || "Failed to save draft");
			}

			const data = await response.json();
			console.log(data);
			setSuccess("Draft saved successfully!");
			router.push("/");
		} catch (err) {
			console.error(err);
			setError(
				err instanceof Error ? err.message : "An unknown error occurred",
			);
		} finally {
			setIsDrafting(false);
		}
	}

	return (
		<>
			<input
				className="p-3 font-bold text-5xl text-yellow-300"
				type="text"
				placeholder="Title"
				onChange={(e) => {
					setTitle(e.target.value);
				}}
			></input>
			<EditorContent editor={editor}></EditorContent>

			{error && <p className="text-red-500 m-3">{error}</p>}
			{success && <p className="text-green-500 m-3">{success}</p>}

			<button
				className="p-3 hover:bg-gray-300 hover:text-black hover:cursor-pointer m-3"
				onClick={handleSubmit}
				disabled={isSubmitting || isDrafting}
			>
				{isSubmitting ? "Submitting..." : "Submit"}
			</button>
			<button
				className="p-3 hover:bg-gray-300 hover:text-black hover:cursor-pointer m-3"
				onClick={handleDraft}
				disabled={isSubmitting || isDrafting}
			>
				{isDrafting ? "Saving..." : "Draft"}
			</button>
		</>
	);
};

export { Tiptap };
