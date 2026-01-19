import { db } from "../db.js";

const collections = await db()
export const dashboardcount = async (req, res) => {
    try {
        const blogscol = collections.blogs;
        const jobscol = collections.career;
        const inquerycol = collections.inquery
        const jobapplicationcol = collections.jobApplications

        // === Total count===
        const Totalblogs = await blogscol.countDocuments();
        const Totaljobs = await jobscol.countDocuments();
        const Totalinquerycol = await inquerycol.countDocuments();
        const Totaljobapplication = await jobapplicationcol.countDocuments()

        res.status(200).json({
            success: true,
            stats: {
                blogs: Totalblogs,
                jobs: Totaljobs,
                inquerycol: Totalinquerycol,
                jobapplications: Totaljobapplication,
            },
        });
    } catch (error) {
        console.log("error", error)
    }
}