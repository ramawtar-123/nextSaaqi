import mongoose from 'mongoose';

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    await mongoose.connect("mongodb://localhost:27017/saaqi_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to Database successfully.")
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default dbConnect;
