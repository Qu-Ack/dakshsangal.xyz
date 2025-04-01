import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";
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

	const result = await prisma.blog.create({
		data: {
			title: output.data.title,
			content: output.data.content,
			draft: true,
		},
	});
	console.log(result);

	return NextResponse.json({ status: "success", output });
}
