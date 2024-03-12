import connectMongoDB from "@/libs/mongodb";
import Contact from "@/models/ContactModel";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req) {
	const contact = await req.json();
	await connectMongoDB();
	await Contact.create(contact);
	return NextResponse.json({ message: "Contact Sent!" }, { status: 201 });
}

export async function GET() {
	await connectMongoDB();
	const contact = await Contact.find();
	return NextResponse.json({ contact });
}

export async function DELETE(req) {
	const id = req.nextUrl.searchParams.get("id");
	await connectMongoDB();
	await Contact.findByIdAndDelete(id);
	return NextResponse.json({ message: "Contact Deleted!" }, { status: 200 });
}
