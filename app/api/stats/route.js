import connectMongoDB from "@/libs/mongodb";
import Stat from "@/models/StatsModel";
import { NextResponse } from "next/server";

export async function POST(req) {
	const { favFont, totalProject, workYears } = await req.json();
	await connectMongoDB();
	const existingData = await Stat.findOne();

	if (existingData) {
		await Stat.updateOne({}, { favFont, totalProject, workYears });
	} else {
		await Stat.create({ favFont, totalProject, workYears });
	}

	return NextResponse.json({ message: "Data updated!" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const stats = await Stat.find();
	return NextResponse.json({ stats });
}
