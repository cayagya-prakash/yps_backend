import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import { db } from "./db.js";
// Import Routes
import authroutes from "./routes/auth_router/auth_router.js"
import blogroutes from "./routes/blog_router/blog_router.js"
import careerroutes from './routes/career_router/career_router.js'
import applicationroutes from './routes/application_router/application_router.js'
import inqueryroutes from './routes/inquery_router/inquery_router.js';
import dashboardroutes from './routes/dashboard_router/dashboard_router.js'
import path from "path";
const app = express()
app.use(express.json())
app.use(cors({
    origin: ["https://ca-yagyap-o79br46o5-cayagya-prakashs-projects.vercel.app/","https://yps-dashboard-c7xrahhyb-cayagya-prakashs-projects.vercel.app/login"], // change to live url
    // origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control', 'Expires', 'Pragma'],
    credentials: true
}));
app.use(
  "/uploads",
  express.static(path.join(process.cwd(), "uploads"))
);

app.use('/api/auth', authroutes)
app.use('/api/blog', blogroutes)
app.use('/api/career',careerroutes)
app.use('/api/application/',applicationroutes)
app.use('/api/inquery',inqueryroutes)
app.use('/api/dashboard',dashboardroutes)

const port = process.env.PORT || 5000
app.get("/", (req, res) => {
    res.send("Node js code deployedd...")
})
app.listen(port)