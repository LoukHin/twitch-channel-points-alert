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

    callbacks: {
        /**
         * @param  {object} user     User object
         * @param  {object} account  Provider account
         * @param  {object} profile  Provider profile
         * @return {boolean|string}  Return `true` to allow sign in
         *                           Return `false` to deny access
         *                           Return `string` to redirect to (eg.: "/unauthorized")
         */
        async signIn(user, account, profile) {
            const isAllowedToSignIn = true
            if (isAllowedToSignIn) {
                return true
            } else {
                // Return false to display a default error message
                return false
                // Or you can return a URL to redirect to:
                // return '/unauthorized'
            }
        },
        /**
         * @param  {string} url      URL provided as callback URL by the client
         * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
         * @return {string}          URL the client will be redirect to
         */
        async redirect(url, baseUrl) {
          return url.startsWith(baseUrl)
            ? url
            : baseUrl
        }
    }
})
