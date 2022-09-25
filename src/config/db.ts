import mongoose from "mongoose";
import Print from "../api/helpers/Print";

const connectDB = async () => {
    const MONGODB_URL = process.env.MONGO_URL;

    if (MONGODB_URL !== undefined) {

        const conn = await mongoose
            .connect(MONGODB_URL)
            .then(() => {
                Print.log(`Connected to ${MONGODB_URL}`)
                Print.log('App is running ... ')
                Print.log('Press CTRL + C to stop the process.')
            })
            .catch((err: any) => {
                Print.log(`App Starting Error : ${err.message}`)
                process.exit(1);
            });

    }
}

export default connectDB