import mongoose from 'mongoose';

export const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);

    console.log('✅ MongoDB connection established successfully');
    console.log(`📦 Host: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};
