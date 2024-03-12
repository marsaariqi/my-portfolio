import connectMongoDB from "@/libs/mongodb";
import Experience from "@/models/experienceModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function PUT(req, { params }) {
	const { id } = params;
	const {
		newRole: role,
		newYear: year,
		newWorkType: workType,
		newCompany: company,
		newWorkSumm: workSummary,
	} = await req.json();
	await connectMongoDB();
	await Experience.findByIdAndUpdate(id, {
		role,
		year,
		workType,
		company,
		workSummary,
	});
	return NextResponse.json({ message: "Heading updated!" }, { status: 200 });
}
