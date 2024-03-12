import mongoose from "mongoose";
const options = {
	useNewUrlParser: true,
	// Remove useUnifiedTopology option
};
const connectMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_URI, options, {
			useUnifiedTopology: true,
		});

		console.log("connected to mongoDB!");
	} catch (e) {
		console.log(e);
	}
};

export default connectMongoDB;
