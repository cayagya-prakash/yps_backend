import { db } from '../db.js'
import bycrpt from 'bcryptjs'
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const collections = await db();
        const checkUser = await collections.user.findOne({ email })
        if (!checkUser) return res.status(400).json({ message: "User not fount" })
        const user = checkUser

        const isMatch = await bycrpt.compare(password, user.password)
        if (!isMatch) return res.status(400).json({ message: "Passwrod is incorrect" })

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" })
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
        });
    } catch (error) {
        console.log("errorr", error)
    }
}

export const Forgetpsd = async (req, res) => {
    const { email, password } = req.body
    try {
        const collections = await db();
        const checkUser = await collections.user.findOne({ email })
        if (!checkUser) return res.status(400).json({ message: "User not fount" })
        const hashpsd = await bycrpt.hash(password, 10);

        const updatedata = await collections.user.updateOne({ email, }, { $set: { password: hashpsd } })

        res.status(200).json({
            status: true,
            message: "Password updated scussfully!!!",
            updatedata
        })

    } catch (error) {
        console.log("error", error)
    }
}
