import express from "express";
import { createAddress, getUserAddress, updateAddress } from "../controller/addressController";


const router = express.Router();

router.get("/get-address/:userId", getUserAddress);
router.post("/create", createAddress);
router.patch("/update/:userId", updateAddress)

export default router;


