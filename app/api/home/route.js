import connectMongoDB from "@/libs/mongodb";
import Home from "@/models/HomeModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
	const { title, summary } = await req.json();
	await connectMongoDB();
	const existingData = await Home.findOne();

	if (existingData) {
		await Home.updateOne({}, { title, summary });
	} else {
		await Home.create({ title, summary });
	}

	return NextResponse.json({ message: "Data updated!" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const home = await Home.find();
	return NextResponse.json({ home });
}
