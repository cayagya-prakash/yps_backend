import express from "express";
import { uploadResume } from "../../middleware/uploadresume.js";
import { AddJobApplication, GetJobApplications } from "../../application_controller/application_controller.js";


const router = express.Router();

router.post(
  "/apply-job",
  uploadResume.single("resume"),
  AddJobApplication
);
router.get("/getAllapplication",GetJobApplications)

export default router;
