import { authSchema } from "~/utils/validations"
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
    const { name, email, password } = await readValidatedBody(event, body => 
        authSchema.parse(body)
    )
    const existingUser = await db.user.findUnique({
        where: {
            email
        }    
    })
    if (existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: "User with this email already exists"
        })
    } 
    const hashedPassword = await hashPassword(password);
    const user = await db.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    })
    const transformedUser = sanituzeUser(user);
        if (transformedUser) {
          await setUserSession(event, {
            user: transformedUser
          })
        }
        
    
    return transformedUser;
    
})