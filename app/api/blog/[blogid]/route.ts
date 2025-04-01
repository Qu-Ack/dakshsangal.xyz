"use server";
import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ blogid: string }> },
) {
	const blogid = (await params).blogid;
	console.log(request);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const blog = await prisma.blog.findUnique({
		where: {
			Id: Number(blogid),
		},
	});

	return NextResponse.json({ status: "success", blog });
}

export async function DELETE(
	request: Request,
	{ params }: { params: Promise<{ blogid: string }> },
) {
	const blogid = Number((await params).blogid);
	console.log(request);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const blog = await prisma.blog.delete({
		where: {
			Id: blogid,
		},
	});

	return NextResponse.json({ status: "success", blog });
}

const blogPutSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ blogid: string }> },
) {
	const body = request.json();
	const blogid = Number((await params).blogid);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const output = blogPutSchema.safeParse(body);

	if (output.success == false) {
		return NextResponse.json({
			status: "failiure",
			error: "Zod Parsing Error",
		});
	}

	const result = await prisma.blog.update({
		where: {
			Id: blogid,
		},
		data: output.data,
	});

	console.log(result);

	return NextResponse.json({ status: "success", result });
}
