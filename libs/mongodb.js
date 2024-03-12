import mongoose from "mongoose";

const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			useUnifiedTopology: true,
		});

		console.log("connected to mongoDB!");
	} catch (e) {
		console.log(e);
	}
};

export default connectMongoDB;
