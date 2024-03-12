import connectMongoDB from "@/libs/mongodb";
import Resume from "@/models/ResumeModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { name, resumeUrl } = await req.json();
	await connectMongoDB();
	const existingData = await Resume.findOne();

	if (existingData) {
		await Resume.updateOne({}, { name, resumeUrl });
	} else {
		await Resume.create({ name, resumeUrl });
	}

	return NextResponse.json({ message: "Data updated!" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const resume = await Resume.find();
	return NextResponse.json({ resume });
}
