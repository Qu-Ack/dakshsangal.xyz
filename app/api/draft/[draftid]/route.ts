import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import isAuthenticated from "../../login/authenticate";

export async function GET(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ draftid: string }>;
	},
) {
	console.log(request);
	const draftid = Number((await params).draftid);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const draft = await prisma.blog.findUnique({
		where: {
			Id: draftid,
			draft: true,
		},
	});

	if (!draft) {
		return NextResponse.json({
			status: "failiure",
			message: "no such draft exists are you trying to access a blog?",
		});
	}

	return NextResponse.json({ status: "success", draft });
}

const draftPutSchema = z.object({
	title: z.string(),
	content: z.string(),
});

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ draftid: string }> },
) {
	isAuthenticated(request);
	const draftid = Number((await params).draftid);
	const body = await request.json();

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const output = draftPutSchema.safeParse(body);

	if (output.success == false) {
		return NextResponse.json({
			status: "failiure",
			error: "Zod Parsing Error",
		});
	}

	const result = await prisma.blog.update({
		where: {
			Id: draftid,
			draft: true,
		},
		data: output.data,
	});

	console.log(result);

	return NextResponse.json({ status: "success", result });
}

export async function DELETE(
	request: Request,
	{
		params,
	}: {
		params: Promise<{ draftid: string }>;
	},
) {
	isAuthenticated(request);
	console.log(request);
	const draftId = Number((await params).draftid);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const result = await prisma.blog.delete({
		where: {
			Id: draftId,
			draft: true,
		},
	});

	return NextResponse.json({ status: "success", result });
}
