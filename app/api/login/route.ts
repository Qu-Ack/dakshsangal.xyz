import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/client";
import CryptoJs from "crypto-js";
import { z } from "zod";

const loginSchema = z.object({
	password: z.string(),
});

export async function POST(request: Request) {
	const body = await request.json();

	const parsedData = loginSchema.safeParse(body);

	if (parsedData.success == false) {
		return NextResponse.json({
			status: "failiure",
			error: "Zod Error",
		});
	}

	if (prisma == undefined) {
		console.error("Prisma Client Not Instantitated");
		return NextResponse.json({
			status: "failiure",
			message: "Internal Server Error",
		});
	}

	if (parsedData.data.password == process.env.PASSWORD) {
		const session = await prisma.session.create({
			data: {
				Id: generateRandomString(6),
				expiresAt: new Date(new Date().setDate(new Date().getDate() + 7)),
			},
		});

		console.log(session.Id);

		const encryptedSessionId = CryptoJs.AES.encrypt(
			session.Id,
			process.env.SECRET!,
		).toString();

		return NextResponse.json({
			status: "success",
			sessionId: encryptedSessionId,
		});
	} else {
		return NextResponse.json(
			{
				status: "failiure",
				error: "Invalid Password",
			},
			{ status: 401 },
		);
	}
}

function generateRandomString(length: number) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		result += characters.charAt(randomIndex);
	}
	return result;
}
