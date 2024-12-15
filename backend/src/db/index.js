import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`mongodb+srv://Akash:mongodbakash123@cluster0.dyrul.mongodb.net/FastMed`,{ //${process.env.MONGODB_URI}/${DB_NAME}
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch(error) {
        console.log("MongoDB connection FAILED ", error);
        process.exit(1);
    }
}

export default connectDB;

//${process.env.MONGODB_URI}/${DBNAME}