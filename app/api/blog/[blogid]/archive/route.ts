import isAuthenticated from "@/app/api/login/authenticate";
import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";

export async function PUT(
	request: Request,
	{ params }: { params: Promise<{ blogid: string }> },
) {
	isAuthenticated(request);
	const blogid = Number((await params).blogid);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	const blog = await prisma.blog.update({
		where: {
			Id: blogid,
			draft: false,
		},
		data: {
			draft: true,
		},
	});

	return NextResponse.json({ status: "sucesss", blog });
}
