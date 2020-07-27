var User   = require('../models/user'),
    bcrypt = require('bcryptjs');
module.exports = {
    GetNewStudentPage: (req , res) => {
        var messages = req.flash('error');
        res.render('pages/new' , {
            messages: messages
        });
    },
    PostNewStudentPage: (req , res) => {
        var errors = [],
            {
                name, gender, email, password, age, rollno, sid, startDate
            }      = req.body;
        if (!name || !email || !password || !gender ||
            !age || !rollno || !sid || !startDate) {
          errors.push({ msg: 'Please enter all fields' });
        }
        if (password.length < 6) {
          errors.push({ msg: 'Password must be at least 6 characters' });
        }
        User.findOne({
            $or: [{
              name: name,
              email: email,
              sid: sid
            }]
        }).then(student => {
            if (student) {
              errors.push({ msg: 'Email or username or password already exists' });
              res.render('pages/new', {
                  errors, name, gender, email, password, age, rollno, sid, startDate
              });
            }else {
              const newstudent = new User({
                  name: req.body.name,
                  gender: req.body.gender,
                  email: req.body.email,
                  password: req.body.password,
                  age: req.body.age,
                  rollno: req.body.rollno,
                  sid: req.body.sid,
                  startDate: new Date()
              });
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newstudent.password, salt, (err, hash) => {
                  if (err) {
                    errors.push({ msg: err.msg });
                  }
                  newstudent.password = hash;
                  newstudent.save().then(studentCreated => {
                      req.flash('success_msg', 'You added the student successfully');
                      res.redirect('/');
                  }).catch(error => {
                      errors.push({ msg: 'Sorry! additing process is failed' });
                      res.render('pages/new' , {
                          errors,
                          name, gender, email, password, age, rollno, sid, startDate
                      });
                  });
                });
              });
            }
        });
    }
}