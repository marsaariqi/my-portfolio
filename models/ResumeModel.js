import mongoose from "mongoose";
const { Schema } = mongoose;

const resumeSchema = new Schema(
	{
		name: String,
		resumeUrl: String,
	},
	{
		timestamps: true,
	}
);

const resumeModel =
	mongoose.models.Resume || mongoose.model("Resume", resumeSchema);

export default resumeModel;
