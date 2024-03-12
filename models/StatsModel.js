import mongoose from "mongoose";
const { Schema } = mongoose;

const statSchema = new Schema(
	{
		favFont: String,
		totalProject: String,
		workYears: String,
	},
	{
		timestamps: true,
	}
);

const statModel = mongoose.models.Stat || mongoose.model("Stat", statSchema);

export default statModel;
