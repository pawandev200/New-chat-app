import mongoose from "mongoose";

// import  dotenv  from 'dotenv';
// dotenv.config();
// const mongo_url=process.env.MONGO_DB_URI;

const connectToMongoDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_DB_URI,{
                    //must add in order to not get any error masseges:
                    // useNewUrlParser: true,
                    // useUnifiedTopology:true,
        });
		console.log("Connected to MongoDB");
	} catch (error) {
		console.log("Error while connecting to the MongoDB & error:", error.message);
	}
};
export default connectToMongoDB;