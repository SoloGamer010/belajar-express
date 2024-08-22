import express from "express";
import { getMahasiswa, deleteMahasiswa, getMahasiswaByNim, updateMahasiswa, createMahasiswa  } from "./controllers/mahasiswaController.js";
// import { getMahasiswa } from "../controllers/mahasiswaController.js";

const router = express.Router();

router.get("/", getMahasiswa);
router.get("/find", getMahasiswaByNim);
router.post("/create", createMahasiswa);
router.put("/put", updateMahasiswa);
router.delete("/delete", deleteMahasiswa);

export default router;