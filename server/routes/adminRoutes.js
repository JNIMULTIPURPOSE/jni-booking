import express from "express";
import {
  adminLogin,
  getDashboardStats,
} from "../controllers/adminController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/* 🔐 ADMIN LOGIN */
router.post("/login", adminLogin);

/* 📊 DASHBOARD (PROTECTED) */
router.get(
  "/dashboard",
  authMiddleware,
  getDashboardStats
);

export default router;