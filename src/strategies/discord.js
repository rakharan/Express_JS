const passport = require('passport')
const { Strategy } = require('passport-discord')
const DiscordUser = require('../database/schemas/DiscordUser')

passport.serializeUser((user, done) => {
    console.log('serializing')
    console.log(user)
    done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
    console.log('deserializing');
    console.log(id);
    try {
        const user = await DiscordUser.findById(id);
        if (!user) throw new Error('User not found');
        console.log("this is user", user)
        done(null, user);
    } catch (err) {
        console.log(err);
        done(err, null);
    }
})

passport.use(new Strategy({
    clientID: '1114199720181633074',
    clientSecret: 'T2pQ-ISvXET8MThP3lnexoO4av2XkZ8M',
    callbackURL: 'http://localhost:3001/auth/discord/redirect',
    scope: ['identify'],
}, async (accessToken, refreshToken, profile, done) => {
    console.log(accessToken, refreshToken)
    console.log(profile)
    const discordUser = await DiscordUser.findOne({ discordID: profile.id });
    try {
        if (discordUser) {
            console.log('user found')
            return done(null, discordUser);
        } else {
            const newUser = await DiscordUser.create({
                discordID: profile.id,
            })
            return done(null, newUser);
        }
    } catch (error) {
        console.log(error)
        return done(err, null)
    }
})
);