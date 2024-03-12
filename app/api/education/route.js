import connectMongoDB from "@/libs/mongodb";
import Education from "@/models/EducationModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
	const eduData = await req.json();
	await connectMongoDB();
	await Education.create(eduData);
	return NextResponse.json({ message: "Education Created!" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const education = await Education.find();
	return NextResponse.json({ education });
}

export async function DELETE(req) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Education.findByIdAndDelete(id);
	return NextResponse.json({ message: "Education Deleted!" }, { status: 200 });
}
