import connectMongoDB from "@/libs/mongodb";
import Education from "@/models/educationModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
	const { id } = params;
	const {
		newUni: university,
		newYear: year,
		newMajor: major,
		newDegree: degree,
	} = await req.json();
	await connectMongoDB();
	await Education.findByIdAndUpdate(id, {
		university,
		year,
		major,
		degree,
	});
	return NextResponse.json({ message: "Heading updated!" }, { status: 200 });
}
