import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

import config from 'lib/config'

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Twitch({
            clientId: config.twitchClientId,
            clientSecret: config.twitchClientSecret
        })
    ],

    // A database is optional, but required to persist accounts in a database
    database: config.databaseConnectionURL,
    pages: {
        signIn: '/auth/signin'
    },
    jwt: {
        signingKey: config.jwtSigningKey
    },
    session: {
        jwt: true
    },
    callbacks: {
        async jwt(token, user, account, profile, isNewUser) {
            if (account && user) {
                return {
                    accessToken: account.accessToken,
                    accessTokenExpires: Date.now() + account.expires_in! * 1000,
                    refreshToken: account.refresh_token,
                    user
                }
            }
            return token
        },
        async session(session, user) {
            return user
        }
    }
})
