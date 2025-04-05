import prisma from "@/lib/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import isAuthenticated from "../login/authenticate";

const createBlogSchema = z.object({
	title: z.string(),
	content: z.string(),
});

const getCorsHeaders = (origin: string) => {
	// Default options
	const headers = {
		"Access-Control-Allow-Methods": `${process.env.ALLOWED_METHODS}`,
		"Access-Control-Allow-Headers": `${process.env.ALLOWED_HEADERS}`,
		"Access-Control-Allow-Origin": `${process.env.DOMAIN_URL}`,
	};

	// If no allowed origin is set to default server origin
	if (!process.env.ALLOWED_ORIGIN || !origin) return headers;

	// If allowed origin is set, check if origin is in allowed origins
	const allowedOrigins = process.env.ALLOWED_ORIGIN.split(",");

	// Validate server origin
	if (allowedOrigins.includes("*")) {
		headers["Access-Control-Allow-Origin"] = "*";
	} else if (allowedOrigins.includes(origin)) {
		headers["Access-Control-Allow-Origin"] = origin;
	}

	// Return result
	return headers;
};

// Endpoints
// ========================================================
/**
 * Basic OPTIONS Request to simuluate OPTIONS preflight request for mutative requests
 */
export const OPTIONS = async (request: NextRequest) => {
	// Return Response
	return NextResponse.json(
		{},
		{
			status: 200,
			headers: getCorsHeaders(request.headers.get("origin") || ""),
		},
	);
};

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
