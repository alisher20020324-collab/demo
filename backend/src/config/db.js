import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.error("❌ MONGO_URI .env da topilmadi");
    return;
  }

  try {
    await mongoose.connect(uri);
    console.log("🍃 MongoDB ulandi");
  } catch (error) {
    console.error("❌ MongoDB ulanishida xatolik:", error.message);
  }
}
