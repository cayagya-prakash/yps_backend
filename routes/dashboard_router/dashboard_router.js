import express from "express";
import auth from "../../middleware/auth.js";
import { dashboardcount } from "../../dashboard_controller/dashboard_controller.js";
const router = express.Router();
router.get("/dashboardcounts", auth,dashboardcount)
export default router;
