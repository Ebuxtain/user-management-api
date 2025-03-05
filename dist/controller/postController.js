"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.deletePost = exports.createPost = void 0;
const postModel_1 = require("../models/postModel");
const userModel_1 = require("../models/userModel");
const PostValidators_1 = require("../validators/PostValidators");
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate input fields
        const validation = PostValidators_1.postValidatorSchema.safeParse(req.body);
        if (!validation.success) {
            const formattedErrors = validation.error.errors.reduce((acc, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});
            res.status(400).json({ errors: formattedErrors });
            return;
        }
        const { title, body, userId } = validation.data;
        // Check if the user exists
        const user = yield userModel_1.UserInstance.findByPk(userId);
        if (!user) {
            res.status(400).json({ message: "User not found. Cannot create post." });
            return;
        }
        // create post
        const newPost = yield postModel_1.PostInstance.create({
            title,
            body,
            userId,
        });
        res.status(201).json({
            message: "Post created successfully",
            data: newPost,
        });
    }
    catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.createPost = createPost;
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Find the post by postId
        const post = yield postModel_1.PostInstance.findByPk(id);
        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        // Delete the post
        yield post.destroy();
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.deletePost = deletePost;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        // Ensure userId is provided and is a valid number
        if (!userId || isNaN(Number(userId))) {
            console.log("Invalid userId received:", userId); // Debugging
            res.status(400).json({ message: "Invalid or missing user ID" });
            return;
        }
        // Convert userId to number
        const userIdNum = Number(userId);
        // Check if the user exists
        const user = yield userModel_1.UserInstance.findByPk(userIdNum);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Fetch all posts made by the user
        const posts = yield postModel_1.PostInstance.findAll({
            where: { userId: userIdNum },
            include: [{ model: userModel_1.UserInstance, as: "user" }],
        });
        if (posts.length === 0) {
            res.status(404).json({ message: "No posts found for this user" });
            return;
        }
        res.status(200).json({
            message: "Posts retrieved successfully",
            data: posts,
        });
    }
    catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.getUserPosts = getUserPosts;
//# sourceMappingURL=postController.js.map