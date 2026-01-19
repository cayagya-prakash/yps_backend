import { db } from '../db.js'
const collections = await db();

export const AddInquery = async (req, res) => {
    const { name, email, phone, message, subject } = req.body
    try {
        const addinq = await collections.inquery
        const add = await addinq.insertOne({ name, email, phone, message, subject })
        res.status(200).json({
            status: true,
            message: "Inquery is added scussfully!!!",
            add
        })
    } catch (error) {
        console.log("error", error)
    }
}
export const getAllinquery = async (req, res) => {
    try {
        const allinq = await collections.inquery.find({}).toArray()
        const inqs = await allinq.map((u, i) => ({
            id: i + 1,
            _id: u._id.toString(),
            ...u,
        }))

        res.status(200).json({
            message: "Get Inquery Scussfully!!!",
            status: true,
            inqs
        })

    } catch (error) {
        console.log("error", error)
    }
}