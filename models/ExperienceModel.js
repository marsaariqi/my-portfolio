import  mongoose  from "mongoose";
const { Schema } = mongoose;

const experienceSchema = new Schema(
    {  
        role: String,
        year: String,
        workType: String,
        company: String,
        workSummary: String,
    },
    {
        timestamps: true,
    }
);

const experienceModel = mongoose.models.Experience || mongoose.model("Experience", experienceSchema);

export default experienceModel;