import connectMongoDB from "@/libs/mongodb";
import Experience from "@/models/ExperienceModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
	const expData = await req.json();
	await connectMongoDB();
	await Experience.create(expData);
	return NextResponse.json({ message: "Experience Created!" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const experience = await Experience.find();
	return NextResponse.json({ experience });
}

export async function DELETE(req) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Experience.findByIdAndDelete(id);
	return NextResponse.json({ message: "Experience Deleted!" }, { status: 200 });
}
