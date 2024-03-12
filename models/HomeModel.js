import  mongoose  from "mongoose";
const { Schema } = mongoose;

const homeSchema = new Schema(
    {  
        title: String,
        summary: String,
    },
    {
        timestamps: true,
    }
);

const homeModel = mongoose.models.Home || mongoose.model("Home", homeSchema);

export default homeModel;