import { z } from "zod";

export const userValidatorSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" }), 
});

export default userValidatorSchema;