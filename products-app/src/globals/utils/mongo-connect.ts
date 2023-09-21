import mongoose from "mongoose";

export const mongoDBConnect = async () => {
  const MONGO_URI = process.env.MONGO_URI as string;

  try {
    await mongoose.connect(MONGO_URI);

    console.info("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
};
