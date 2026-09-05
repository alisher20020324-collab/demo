import { User, getTotalLogins } from "../models/userModel.js";

// Joriy tizimga kirgan foydalanuvchi ma'lumoti (token orqali) — sahifa
// yangilanganda frontend shu orqali kim kirganini va rolini bilib oladi.
export const getMe = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
  }
  return res.json({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role
  });
};

// Faqat admin uchun: barcha foydalanuvchilar ro'yxati + statistika.
export const getAdminStats = async (_req, res) => {
  const users = await User.find({}).sort({ createdAt: -1 });
  const totalUsers = users.length;
  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalLogins = await getTotalLogins();

  const list = users.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    createdAt: u.createdAt,
    lastLoginAt: u.lastLoginAt,
    loginCount: u.loginCount || 0
  }));

  return res.json({
    totalUsers,
    totalAdmins,
    totalLogins,
    users: list
  });
};
