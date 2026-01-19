import express from "express";
import { AddInquery, getAllinquery } from "../../inquery_controller/inquery_controller.js";
const router = express.Router()
router.post("/addinquery", AddInquery)
router.get("/getAllinquery",getAllinquery)
export default router;