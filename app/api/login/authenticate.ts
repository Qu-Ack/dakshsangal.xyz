import prisma from "@/lib/prisma/client";
import { NextResponse } from "next/server";
import CryptoJS from "crypto-js";

async function Authenticate(request: Request): Promise<boolean> {
	const sessionId = extractHeader(request);

	console.log("the received session id");

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
	console.log("header we got", request.headers.get("Authorization"));
	return request.headers.get("Authorization");
}

export default function isAuthenticated(request: Request) {
	const isAuthenticated = Authenticate(request);
	const origin = request.headers.get("origin") || "*";

	if (!isAuthenticated) {
		return new NextResponse(
			JSON.stringify({ status: "failure", error: "Authentication Error" }),
			{
				status: 401,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": origin,
					Vary: "Origin",
				},
			},
		);
	}
}
