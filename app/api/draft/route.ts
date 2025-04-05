import prisma from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import isAuthenticated from "../login/authenticate";

const createBlogSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export async function POST(request: Request) {
	isAuthenticated(request);
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

export async function GET(request: Request) {
	isAuthenticated(request);
	console.log(request);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const result = await prisma.blog.findMany({
		where: {
			draft: true,
		},
	});

	console.log("draft called");
	return NextResponse.json({ status: "success", drafts: result });
}
