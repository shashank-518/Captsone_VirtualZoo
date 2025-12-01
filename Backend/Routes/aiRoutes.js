import express from "express";
import {getAnimalDetailsAndQuiz} from "../Controllers/aiControllers.js"

const router = express.Router();

router.post("/animal", getAnimalDetailsAndQuiz)


export default router;