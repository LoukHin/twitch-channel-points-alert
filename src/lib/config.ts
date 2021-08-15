const config = {
    NODE_ENV: process.env.NODE_ENV,
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    appURL: process.env.NEXT_PUBLIC_APP_URL,
    databaseConnectionURL: process.env.DATABASE_CONNECTION_URL,
    jwtSigningKey: process.env.JWT_SIGNING_PRIVATE_KEY,
    secret: process.env.SECRET,
    twitchClientId: process.env.TWITCH_CLIENT_ID,
    twitchClientSecret: process.env.TWITCH_CLIENT_SECRET
}

Object.assign({
    twitchClientId: '',
    twitchClientSecret: ''
}, config)

export default config
