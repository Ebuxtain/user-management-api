import { Request, Response } from "express";
import { PostInstance } from "../models/postModel";
import { UserInstance } from "../models/userModel";
import { postValidatorSchema } from "../validators/PostValidators";


export const createPost = async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate input fields
        const validation = postValidatorSchema.safeParse(req.body);

        if (!validation.success) {
            const formattedErrors = validation.error.errors.reduce((acc: any, err) => {
                acc[err.path[0]] = err.message;
                return acc;
            }, {});
            res.status(400).json({ errors: formattedErrors });
            return;
        }

        const { title, body, userId } = validation.data;

        // Check if the user exists
        const user = await UserInstance.findByPk(userId);
        if (!user) {
            res.status(400).json({ message: "User not found. Cannot create post." });
            return;
        }

        // create post
        const newPost = await PostInstance.create({
            title,
            body,
            userId,
        });

        res.status(201).json({
            message: "Post created successfully",
            data: newPost,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const deletePost = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        // Find the post by postId
        const post = await PostInstance.findByPk(id);

        if (!post) {
            res.status(404).json({ message: "Post not found" });
            return;
        }

        // Delete the post
        await post.destroy();

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getUserPosts = async (req: Request, res: Response): Promise<void> => {
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
        const user = await UserInstance.findByPk(userIdNum);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        // Fetch all posts made by the user
        const posts = await PostInstance.findAll({
            where: { userId: userIdNum },
            include: [{ model: UserInstance, as: "user" }],
        });

        if (posts.length === 0) {
            res.status(404).json({ message: "No posts found for this user" });
            return;
        }

        res.status(200).json({
            message: "Posts retrieved successfully",
            data: posts,
        });
    } catch (error) {
        console.error("Error fetching user posts:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
