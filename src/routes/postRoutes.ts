import express from "express";
import { createPost, deletePost, getUserPosts} from "../controller/postController";

const router = express.Router();


router.get("/get-post/:userId", getUserPosts);
router.post("/create", createPost);
router.delete("/delete/:id", deletePost);

export default router;