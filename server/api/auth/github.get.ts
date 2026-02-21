import db from "@/utils/db"
import { sanituzeUser } from "~/server/utils/auth"
export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true
  },
  async onSuccess(event, { user }) {
    let currentUser = await db.user.findUnique({
      where: {
        email: user.email!
      }
    })
    if (!currentUser) {
      currentUser = await db.user.create({
        data: {
          email: user.email!,
          name: user.name,
          avatarUrl: user.avatar_url
        }
      })
    }

    const oAuthAccount =  await db.oauthAccount.findUnique({
      where: {
        providerId_providerUserId: {
          providerId: "github",
          providerUserId: String(user.id)
        }
      }
    })
    if (!oAuthAccount) {
      await db.oauthAccount.create({
        data: {
          userId: currentUser.id,
          providerId: "github",
          providerUserId: user.id + ""
        }
      })
    }

    const transformedUser = sanituzeUser(currentUser)
    if (transformedUser) {
      await setUserSession(event, {
        user: transformedUser
      })
    }
    return sendRedirect(event, '/') 
  },
  // Optional, will return a json error and 401 status code by default
  onError(event, error) {
    console.error('GitHub OAuth error:', error)
    return sendRedirect(event, '/')
  },
})