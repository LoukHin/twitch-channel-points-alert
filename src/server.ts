import express from 'express'
import next from 'next'

import cookieParser from 'cookie-parser'
import cookieSession from 'cookie-session'
import passport from 'passport'
import { Strategy as twitchStrategy } from 'passport-twitch-latest'

import config from './config'

const port = Number(config.port) || 3000
const dev = config.NODE_ENV !== 'production'

const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    server.use(express.json())
    server.use(cookieParser())
    server.use(cookieSession({ secret: config.cookieSecret }))
    server.use(passport.initialize())
    server.use(passport.session())
    server.use(express.static('./public'))

    passport.use(
        new twitchStrategy(
            {
                clientID: config.twitchClientId,
                clientSecret: config.twitchClientSecret,
                callbackURL: `${config.appUrl}/auth/twitch/callback`,
                scope: 'user_read'
            },
            (accessToken, refreshToken, profile, done) => {
                // Suppose we are using mongo..
                console.log(accessToken, refreshToken, profile)
                return done(null, profile)
            }
        )
    )

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser((user: Express.User, done) => {
        done(null, user)
    })

    server.get('/auth/twitch', passport.authenticate('twitch'))
    server.get('/auth/twitch/callback', passport.authenticate('twitch', { failureRedirect: '/' }), (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/')
    })

    server.get('/logout', function(req, res){
        req.logout();
        res.redirect('/');
      });

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server
        .listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`)
        })
        .on('error', (error) => {
            console.log('Error happened: ', error.message)
        })
})
