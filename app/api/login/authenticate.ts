import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

async function Authenticate(request: Request): Promise<boolean> {
	const sessionId = extractHeader(request);

	if (!sessionId) {
		return false;
	}

	if (process.env.SECRET == undefined) {
		return false;
	}

	const sesId = CryptoJS.AES.decrypt(sessionId, process.env.SECRET).toString(
		CryptoJS.enc.Utf8,
	);

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return false;
	}

	const ses = await prisma.session.findUnique({
		where: {
			Id: sesId,
		},
	});

	if (!ses) {
		return false;
	}

	if (ses.expiresAt < new Date()) {
		return false;
	}

	return true;
}

function extractHeader(request: Request) {
	return request.headers.get("session");
}

export default function isAuthenticated(request: Request) {
	const isAuthenticated = Authenticate(request);

	if (!isAuthenticated) {
		return NextResponse.json(
			{ status: "failure", error: "Authentication Error" },
			{
				status: 401,
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				},
			},
		);
	}
}
