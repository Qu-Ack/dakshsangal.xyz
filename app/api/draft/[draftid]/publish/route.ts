import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ draftid: string }> },
) {
	const draftid = (await params).draftid;
	console.log(request);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const blog = await prisma.blog.update({
		where: {
			Id: Number(draftid),
			draft: true,
		},
		data: {
			publishedAt: new Date(),
			draft: false,
		},
	});

	return NextResponse.json({ status: "success", blog });
}
