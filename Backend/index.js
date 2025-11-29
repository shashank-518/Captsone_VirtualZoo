import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";


dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json());


const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
