import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], default: "user" },
  lastLoginAt: { type: Date, default: null },
  loginCount: { type: Number, default: 0 }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

// Login statistikasi — admin panelda "jami loginlar soni" shundan olinadi.
const statsSchema = new mongoose.Schema({
  totalLogins: { type: Number, default: 0 }
});

const Stats = mongoose.model("Stats", statsSchema);

export async function incrementTotalLogins() {
  const stats = await Stats.findOneAndUpdate(
    {},
    { $inc: { totalLogins: 1 } },
    { new: true, upsert: true }
  );
  return stats.totalLogins;
}

export async function getTotalLogins() {
  const stats = await Stats.findOne({});
  return stats?.totalLogins || 0;
}
