// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
	const origin = request.headers.get("origin") || "*";

	if (request.method === "OPTIONS") {
		console.log("options request initiated");
		return new NextResponse(null, {
			status: 204,
			headers: {
				"Access-Control-Allow-Origin": origin,
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization, session",
				Vary: "Origin",
			},
		});
	}

	const response = NextResponse.next();
	response.headers.set("Access-Control-Allow-Origin", origin);
	response.headers.set(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, OPTIONS",
	);
	response.headers.set(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization, session",
	);
	response.headers.set("Vary", "Origin");

	return response;
}
