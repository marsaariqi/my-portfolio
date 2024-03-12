import connectMongoDB from "@/libs/mongodb";
import Awbibib from "@/models/AwbibibModel";
import { NextResponse } from "next/server";
import { compare, hash } from "bcryptjs";

export const dynamic = "force-dynamic";

export async function POST(req) {
	await connectMongoDB();
	const { username, password } = await req.json();
	const checkAwbibib = await Awbibib.findOne({ username });

	if (!checkAwbibib) {
		return NextResponse.json({
			success: false,
			message: `${username} is not here:)`,
		});
	}

	const hashAwbibib = await hash(checkAwbibib.password, 12);

	const checkPassword = await compare(password, hashAwbibib);

	if (!checkPassword) {
		return NextResponse.json({
			success: false,
			message: "wrong password:)",
		});
	}

	return NextResponse.json({
		success: true,
		message: "hi! awbibib",
	});
}
