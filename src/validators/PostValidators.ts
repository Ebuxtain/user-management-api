import { z } from "zod";

export const postValidatorSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    body: z.string().min(1, { message: "Body is required" }),
    userId: z.number().min(1, { message: "Valid User ID is required" }),
});


export default postValidatorSchema;
