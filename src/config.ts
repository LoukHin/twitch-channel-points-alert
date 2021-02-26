const config = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    appUrl: process.env.APP_URL,
    cookieSecret: process.env.COOKIE_SECRET!,
    twitchClientId: process.env.TWITCH_CLIENT_ID!,
    twitchClientSecret: process.env.TWITCH_CLIENT_SECRET!
}

Object.assign({
    cookieSecret: '',
    twitchClientId: '',
    twitchClientSecret: ''
}, config)

export default config
