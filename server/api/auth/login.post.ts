import { authSchema } from "~/utils/validations"
import db from "~/utils/db";

export default defineEventHandler(async (event) => {
    const {  email, password } = await readValidatedBody(event, body => 
        authSchema.parse(body)
    )
    const existingUser = await db.user.findUnique({
        where: {
            email
        }    
    })
    if (!existingUser) {
        throw createError({
            statusCode: 400,
            statusMessage: "User not found"
        })
    } 

    if (existingUser.hashedPassword) {
        const connectedOAuthAccount = await db.oauthAccount.findFirst({
            where: {
                userId: existingUser.id
            }
        })
        if (connectedOAuthAccount) {
            const oAuthAccountProvider = connectedOAuthAccount.providerId
            throw createError({
                statusCode: 400,
                statusMessage: `This email is associated with an ${oAuthAccountProvider} account. Please login with ${oAuthAccountProvider}`
            })
        }       
    }

    if (existingUser.hashedPassword) {
        const isPasswordCorrect = await verifyPassword(existingUser.hashedPassword, password);
        if (!isPasswordCorrect) {
            throw createError({
                statusCode: 400,
                statusMessage: "Invalid password"
            })
        }
    }

    const transformedUser = sanituzeUser(existingUser);
        if (transformedUser) {
          await setUserSession(event, {
            user: transformedUser
          })
        }
        
    
    return transformedUser;
    
})