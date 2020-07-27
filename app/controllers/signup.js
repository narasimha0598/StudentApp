var bcrypt = require('bcryptjs'),
    User   = require('../models/user');
module.exports = {
    GetSignUpPage: (req , res) => {
        var messages = req.flash('error');
        res.render('pages/signup' , {
            messages: messages
        });
    },
    PostSignUpPage: (req, res) => {
        const { name, email, password, repassword } = req.body;
        let errors = [];
        if (!name || !email || !password || !repassword) {
          errors.push({ msg: 'Please enter all fields' });
        }
        if (password != repassword) {
          errors.push({ msg: 'Passwords do not match' });
        }
        if (password.length < 6) {
          errors.push({ msg: 'Password must be at least 6 characters' });
        }
        if (errors.length > 0) {
          res.render('pages/signup', {
            errors, name, email, password, repassword
          });
        } else {
          User.findOne({
            $or: [{
              name: name,
              email: email,
              password: password
            }]
          }).then(admin => {
            if (admin) {
              errors.push({ msg: 'Email or username or password already exists' });
              res.render('pages/signup', {
                  errors, name, email, password, repassword
              });
            }else {
              const newAdmin = new User({ name, email, password });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                  if (err) {
                    errors.push({ msg: err.msg });
                  }
                  newAdmin.password = hash;
                  newAdmin.save().then(admin => {
                      req.flash('success_msg',
                                'You are now registered successfully');
                      res.redirect('/');
                  }).catch(err => { throw err });
                });
              });
            }
          });
        }
    }
}