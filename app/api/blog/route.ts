import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
const sanitizeHtml = require("sanitize-html");
import { z } from "zod";

const createBlogSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export async function POST(request: Request) {
	const body = await request.json();
	const output = createBlogSchema.safeParse(body);

	if (output.success == false) {
		return NextResponse.json({
			status: "failiure",
			error: "Zod Parsing Error",
		});
	}

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}
	console.log(output.data);

	const sanitizedTitle = sanitizeHtml(output.data.title);
	const sanitizedContent = sanitizeHtml(output.data.content, {
		allowedAttributes: {
			code: ["class"],
			span: ["class"],
		},
	});

	const result = await prisma.blog.create({
		data: {
			content: sanitizedContent,
			title: sanitizedTitle,
		},
	});
	console.log(result);

	return NextResponse.json({ status: "success", output });
}

export async function GET() {
	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const blogs = await prisma.blog.findMany({
		where: {
			draft: false,
		},
	});

	return NextResponse.json({ blogs });
}
