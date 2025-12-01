import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Config/db.js";
import authRoutes from "./Routes/authRoutes.js";
import aiRoutes from "./Routes/aiRoutes.js"
import  Gen3dRoutes from "./Routes/gen3dRoute.js"

dotenv.config()
connectDB()

const app = express()
app.use(cors())
app.use(express.json());


const port = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);
app.use("/api/ai" , aiRoutes);
app.use("/api/3d" , Gen3dRoutes);


app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
