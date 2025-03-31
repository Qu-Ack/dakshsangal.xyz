"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";

const Tiptap = () => {
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

	function handleSubmit() {
		console.log(editor?.getHTML());
	}

	return (
		<>
			<EditorContent editor={editor}></EditorContent>
			<button onClick={handleSubmit}>Submit</button>
		</>
	);
};

export { Tiptap };
