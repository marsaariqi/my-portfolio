import mongoose from "mongoose";
const { Schema } = mongoose;

const educationSchema = new Schema(
	{
		university: String,
		year: String,
		major: String,
		degree: String,
	},
	{
		timestamps: true,
	}
);

const educationModel =
	mongoose.models.Education || mongoose.model("Education", educationSchema);

export default educationModel;
