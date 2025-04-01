"use client";
import React from "react";
import Head from "next/head";
import { createLowlight, common } from "lowlight";
import parse, { domToReact } from "html-react-parser";
import { Blog } from "@/lib/prismaClient";

type SingleBlogViewerProps = {
	blog?: Blog | null;
};

export default function SingleBlogViewerClient({
	blog,
}: SingleBlogViewerProps) {
	if (!blog) {
		return <div>Blog not found.</div>;
	}

	const metaDescription =
		blog.content.replace(/<[^>]*>/g, "").slice(0, 150) || "Blog post";

	const options = {
		replace: (domNode: any) => {
			if (domNode.name === "p") {
				return (
					<p style={{ marginBottom: "2em" }}>
						{domToReact(domNode.children, options)}
					</p>
				);
			}
			if (domNode.name === "pre") {
				const codeNode = domNode.children?.find(
					(child: any) => child.name === "code",
				);
				if (codeNode) {
					const className = codeNode.attribs?.class || "";
					const language = className.split("language-")[1] || "plaintext";
					const codeText = codeNode.children
						.map((child: any) => child.data)
						.join("");
					return <CodeBlockClient language={language} code={codeText} />;
				}
			}
		},
	};

	return (
		<>
			<Head>
				<title>{blog.title}</title>
				<meta name="description" content={metaDescription} />
			</Head>
			<article>
				<header>
					<h1>{blog.title}</h1>
					<p>
						{new Date(blog.publishedAt).toLocaleDateString(undefined, {
							year: "numeric",
							month: "long",
							day: "numeric",
						})}
					</p>
				</header>
				<section>{parse(blog.content, options)}</section>
			</article>
		</>
	);
}

interface CodeBlockProps {
	language: string;
	code: string;
}

const CodeBlockClient: React.FC<CodeBlockProps> = ({ language, code }) => {
	"use client";
	const lowlight = createLowlight(common);

	const escapedCode = code.replace(
		/[&<>]/g,
		(char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char] || char,
	);

	const highlighted = lowlight.highlight(language, escapedCode).children;

	const toHtml = (nodes: any): string => {
		return nodes
			.map((node: any) => {
				if (node.type === "text") {
					return node.value;
				}
				if (node.type === "element") {
					if (node.tagName === "code") {
						return toHtml(node.children || []);
					}

					const tagName = node.tagName;
					const attributes = Object.entries(node.properties || {})
						.map(([key, value]) => {
							if (key === "className") {
								key = "class";
							}

							let processedValue = Array.isArray(value)
								? value.join(" ")
								: value;

							return ` ${key}="${String(processedValue).replace(/"/g, "&quot;")}"`;
						})
						.join("");

					return `<${tagName}${attributes}>${toHtml(node.children || [])}</${tagName}>`;
				}
				return "";
			})
			.join("");
	};

	const rawHtml = toHtml(highlighted);

	return (
		<pre className={`code-block language-${language}`}>
			<code
				className={`language-${language}`}
				dangerouslySetInnerHTML={{ __html: rawHtml }}
			/>
		</pre>
	);
};
