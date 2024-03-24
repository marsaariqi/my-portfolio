import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

export default async function withApiKey(req: NextRequest) {
	const isApiRequest = req.nextUrl.pathname.startsWith("/api");

	if (isApiRequest) {
		if (req.nextUrl.pathname !== "/api/uploadthing") {
			const authHeader = headers().get("authorization");

			if (req.method === "GET") {
				const apiKey = process.env.NEXT_PUBLIC_API_KEY;
				if (!apiKey) {
					throw new Error("Missing environment variable: NEXT_PUBLIC_API_KEY");
				}

				if (!authHeader || !authHeader.startsWith("Bearer ")) {
					return NextResponse.json(
						{ message: "Unauthorized: Missing API key" },
						{ status: 401 }
					);
				}

				const token = authHeader.split(" ")[1];
				if (token !== apiKey) {
					return NextResponse.json(
						{ message: "Unauthorized: Invalid API key" },
						{ status: 401 }
					);
				}
			} else if (req.method === "POST") {
				if (req.nextUrl.pathname === "/api/contact") {
					const apiKey = process.env.NEXT_PUBLIC_API_KEY;
					if (!apiKey) {
						throw new Error(
							"Missing environment variable: NEXT_PUBLIC_API_KEY"
						);
					}

					if (!authHeader || !authHeader.startsWith("Bearer ")) {
						return NextResponse.json(
							{ message: "Unauthorized: Missing API key" },
							{ status: 401 }
						);
					}

					const token = authHeader.split(" ")[1];
					if (token !== apiKey) {
						return NextResponse.json(
							{ message: "Unauthorized: Invalid API key" },
							{ status: 401 }
						);
					}
				} else {
					const apiKey = process.env.NEXT_PUBLIC_API_KEY_AWBIBIB;
					if (!apiKey) {
						throw new Error(
							"Missing environment variable: NEXT_PUBLIC_API_KEY_AWBIBIB"
						);
					}
					if (!authHeader || !authHeader.startsWith("Bearer ")) {
						return NextResponse.json(
							{ message: "Unauthorized: Missing API key" },
							{ status: 401 }
						);
					}
					const token = authHeader.split(" ")[1];
					if (token !== apiKey) {
						return NextResponse.json(
							{ message: "Unauthorized: Invalid API key" },
							{ status: 401 }
						);
					}
				}
			} else if (req.method === "DELETE") {
				const apiKey = process.env.NEXT_PUBLIC_API_KEY_AWBIBIB;
				if (!apiKey) {
					throw new Error(
						"Missing environment variable: NEXT_PUBLIC_API_KEY_AWBIBIB"
					);
				}
				if (!authHeader || !authHeader.startsWith("Bearer ")) {
					return NextResponse.json(
						{ message: "Unauthorized: Missing API key" },
						{ status: 401 }
					);
				}
				const token = authHeader.split(" ")[1];
				if (token !== apiKey) {
					return NextResponse.json(
						{ message: "Unauthorized: Invalid API key" },
						{ status: 401 }
					);
				}
			} else {
				return NextResponse.json(
					{ message: "Method not allowed" },
					{ status: 405 }
				);
			}
		}
	}

	return NextResponse.next();
}
