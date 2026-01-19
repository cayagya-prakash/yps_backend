import { format } from 'date-fns';
import { db } from '../db.js'
import { ObjectId } from "mongodb";
const collections = await db();


export const AddJob = async (req, res) => {

    const { jobTitle, jobType, department, location, workMode, experience, qualification, jobDescription, keyResponsibilities, requiredSkills, preferredSkills, salaryRange, openings, deadline, status, } = req.body

    try {
        if (!jobTitle || !jobType || !department || !location || !workMode || !experience || !qualification || !jobDescription || !openings || !deadline || !status) {
            res.status(400).json({
                message: "Please add all requried fields"
            })
        }
        const addjobs = await collections.career
        const newjob = await addjobs.insertOne({ jobTitle, jobType, department, location, workMode, experience, qualification, jobDescription, keyResponsibilities, requiredSkills, preferredSkills, salaryRange, openings, deadline, status })
        return res.status(200).json({
            status: true,
            message: "Job is added scussfully!!!",
            newjob
        })

    } catch (error) {
        console.log("errorr", error)
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const rowjobs = await collections.career.find({}).toArray()
        const jobs = await rowjobs.map((j, i) => ({
            id: i + 1,
            _id: j._id.toString(),
            ...j,
            deadline: format(j.deadline, 'dd-MM-yyyy'),

        }))
        res.status(200).json({
            message: "Get Jobs Scussfully!!!",
            status: true,
            jobs
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const getJobbyId = async (req, res) => {
    const { _id } = req.params
    try {
        const job = await collections.career.findOne({
            _id: new ObjectId(_id),
        });
        if (!job) {
            return res.status(404).json({
                status: false,
                message: "Job not found",
            });
        }
        return res.status(200).json({
            status: true,
            message: "Get Job details successfully!",
            job,
        });
    } catch (error) {
        console.log("error", error)
    }
}

export const UpdateJob = async (req, res) => {
    const { jobTitle, jobType, department, location, workMode, experience, qualification, jobDescription, keyResponsibilities, requiredSkills, preferredSkills, salaryRange, openings, deadline, status } = req.body
    const { _id } = req.params
    try {
        const jobCollection = collections.career;

        const existingjob = await jobCollection.findOne({
            _id: new ObjectId(_id),
        });
        if (!existingjob) {
            return res.status(400).json({
                status: false,
                message: "Job not found"
            })
        }
        const updatedata = await jobCollection.updateOne({ _id: new ObjectId(_id), }, { $set: { jobTitle, jobType, department, location, workMode, experience, qualification, jobDescription, keyResponsibilities, requiredSkills, preferredSkills, salaryRange, openings, deadline, status } })

        return res.status(200).json({
            message: "job Details are Updated!!!",
            status: true
        })
    } catch (error) {
        console.log("error", error)
    }
}

export const Delete = async (req, res) => {
    const { id } = req.params
    const jobs = await collections.career
    try {
        const result = await jobs.deleteOne({ _id: new ObjectId(id) })

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: "Job not found" });
        }
        res.status(200).json({
            message: "Job deleted Scussfully!!!",
            status: true
        })
    } catch (error) {
        console.log("error", error)
    }
}