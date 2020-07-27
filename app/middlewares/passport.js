var User          = require('../models/user'),
    bcrypt        = require('bcryptjs'),
    localStrategy = require('passport-local').Strategy;
module.exports = (passport) => {
    passport.use('local', new localStrategy({
        usernameField: 'email',
        passReqToCallback : true
    }, (req, email, password, done) => {
        User.findOne({
            email: email
        }).then(user => {
            if (!user) {
                return done(null, false, {
                    message: 'That email is not registered'
                });
            }else{
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if (err) throw err;
                    if (isMatch) {
                        req.flash(
                            'success_msg',
                            'You are now signed in successfully'
                        );
                        return done(null, user);
                    } else {
                        return done(null, false, {
                            message: 'Password incorrect'
                        });
                    }
                });
            }
        }).catch(err => {
            return done(err);
        });
    }));
    passport.serializeUser((user , done) => {
        done(null , user.id);
    });
    passport.deserializeUser((id , done) => {
        User.findById(id , (err , user) => {
            done(err , user);
        });
    });
}