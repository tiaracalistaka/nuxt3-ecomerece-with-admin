import {z} from "zod";
export const authSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    name: z.string().max(255, "Name must be less than 255 characters long").default("").optional()  
})