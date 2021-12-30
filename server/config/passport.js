const passport = require('passport')
const localStrategy = require('passport-local')
const bcrypt = require('bcrypt')
const User = require('../models/user')

const customFields = {
    usernameField: 'email'
}

const verifyCallback = (email, password, done) => {
    User.findOne({email: email}, (err, user) => {
        if (err) { return done(err) }
        if (!user) { return done(null, false, { message: 'Incorrect email.' }) }

        bcrypt.compare(password, user.password, (err, res) => {
            if (err) { return done(err) }
            if (res === false) { return done(null, false, { message: 'Incorrect password' }) }

            return done(null, user)
        })
    })
}

const strategy = new localStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser( (user, done) => {
    done(null, user.id)
})

passport.deserializeUser( (id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
})