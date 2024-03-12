import mongoose from "mongoose";
const { Schema } = mongoose;

const contactSchema = new Schema(
	{
		name: String,
		email: String,
		phone: String,
		message: String,
	},
	{
		timestamps: true,
	}
);

const contactModel =
	mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default contactModel;
