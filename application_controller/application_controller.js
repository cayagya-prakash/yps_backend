import { ObjectId } from "mongodb";
import { db } from '../db.js'
const collections = await db();

export const AddJobApplication = async (req, res) => {
  try {
    const {
      jobId,
      fullName,
      email,
      mobile,
      applyfor,
      city,
      qualification,
      experience,
      status,
      portfolio,
      reason,
      expectedSalary,
      noticePeriod,
    } = req.body;

    const resume = req.file ? `/uploads/resume/${req.file.filename}` : null;

    // ✅ Validation
    if (
      !jobId ||
      !fullName ||
      !email ||
      !mobile ||
      !city ||
      !qualification ||
      !experience ||
      !status ||
      !resume ||
      !reason
    ) {
      return res.status(400).json({
        status: false,
        message: "Please fill all required fields",
      });
    }

    // ✅ Check job exists
    const job = await collections.career.findOne({
      _id: new ObjectId(jobId),
    });

    if (!job) {
      return res.status(404).json({
        status: false,
        message: "Job not found",
      });
    }

    const applicationData = {
      jobId: new ObjectId(jobId), // 🔑 FOREIGN KEY
      fullName,
      email,
      mobile,
      city,
      qualification,
      experience,
      status,
      resume,
      portfolio,
      reason,
      expectedSalary,
      applyfor,
      noticePeriod,
      appliedAt: new Date(),
    };

    const result = await collections.jobApplications.insertOne(applicationData);

    return res.status(200).json({
      status: true,
      message: "Application submitted successfully",
      applicationId: result.insertedId,
    });
  } catch (error) {
    console.error("AddJobApplication Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};

export const GetJobApplications = async (req, res) => {
  try {

     const BASE_URL = `${req.protocol}://${req.get("host")}`;

    const formatImage = (path, folder) => {
      if (!path) return null;

      const name = path.split("/").pop();
      return  `${BASE_URL}${path}`
    };
    const applications = await collections.jobApplications
      .aggregate([
        {
          $lookup: {
            from: "career",
            localField: "jobId",
            foreignField: "_id",
            as: "jobDetails",
          },
        },
        { $unwind: "$jobDetails" },
        { $sort: { appliedAt: -1 } }, // latest first
      ])
      .toArray();
    const finalResult = applications.map((item, index) => ({
      id: index + 1,
      ...item,
      resume:formatImage(item.resume)
    }));

    return res.status(200).json({
      status: true,
      data: finalResult,
    });
  } catch (error) {
    console.error("GetJobApplications Error:", error);
    res.status(500).json({
      status: false,
      message: "Server error",
    });
  }
};
