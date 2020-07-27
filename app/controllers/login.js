var passport = require('passport');
module.exports = {
    GetSignInPage: (req , res) => {
        var messages = req.flash('error');
        res.render('pages/login' , {
            messages: messages
        });
    },
    PostSignInPage: (req , res , next) => {
        passport.authenticate('local' , {
            successRedirect: '/',
            failureRedirect: '/login',
            successFlash: true,
            failureFlash: true
        })(req , res , next);
    }
}