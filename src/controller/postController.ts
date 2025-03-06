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
  
      // Find the post first
      const post = await PostInstance.findByPk(id);
      if (!post) {
         res.status(404).json({ message: "Post not found" });
         return 
      }
  
      await post.destroy(); // ✅ Only delete if the post exists
       res.status(200).json({ message: "Post deleted successfully" });
       return
  
    } catch (error) {
      console.error("Error deleting post:", error);
       res.status(500).json({ message: "Internal server error" });
       return
    }
  };
  



  export const getUserPosts = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userId } = req.params;
  
      // Ensure user exists before fetching posts
      const user = await UserInstance.findByPk(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return
      }
  
      const posts = await PostInstance.findAll({ where: { userId } });
  
      res.status(200).json({
        message: "Posts retrieved successfully",
        data: posts, 
      });
      return
  
    } catch (error) {
      console.error("Error retrieving posts:", error);
     res.status(500).json({ message: "Internal server error" });
    }
    return 
  };
  
