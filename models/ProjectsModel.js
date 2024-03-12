import mongoose from "mongoose";
const { Schema } = mongoose;

const projectSchema = new Schema(
	{
		title: String,
		desc: String,
		githubLink: String,
		projectLink: String,
		image: String,
	},
	{
		timestamps: true,
	}
);

const ProjectModel =
	mongoose.models.Project || mongoose.model("Project", projectSchema);

export default ProjectModel;
