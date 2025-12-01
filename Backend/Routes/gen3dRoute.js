import express from "express";
import {generate3DHologram} from "../Controllers/Generate3D.js"

const router = express.Router();

router.post("/generate3d", generate3DHologram)


export default router;