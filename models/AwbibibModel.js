import  mongoose  from "mongoose";
const { Schema } = mongoose;

const awbibibSchema = new Schema(
    {  
        username: String,
        password: String,
    },
    {
        timestamps: true,
    }
);

const awbibibModel = mongoose.models.Awbibib || mongoose.model("Awbibib", awbibibSchema);

export default awbibibModel;