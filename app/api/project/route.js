import connectMongoDB from "@/libs/mongodb";
import Project from "@/models/ProjectsModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
	const project = await req.json();
	await connectMongoDB();
	await Project.create(project);
	return NextResponse.json({ message: "Project Created!" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const project = await Project.find();
	return NextResponse.json({ project });
}

export async function DELETE(req) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Project.findByIdAndDelete(id);
	return NextResponse.json({ message: "Project Deleted!" }, { status: 200 });
}
