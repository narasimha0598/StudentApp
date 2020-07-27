var User = require('../models/user');
module.exports = {
    EditStdInfo: (req , res) => {
        var messages = req.flash('error');
        User.findById(req.params.id).then(studentinfo => {
            res.render('pages/edit' , {
                student: studentinfo,
                messages: messages
            });
        }).catch(err => {
            res.redirect('back');
        });
    },
    PutStdInfo: (req , res) => {
        var errors     = [],
            {
                name, gender, email, password, age, rollno, sid
            }          = req.body;
        User.findByIdAndUpdate(req.params.id , {
            name: req.body.name,
            gender: req.body.gender,
            email: req.body.email,
            password: req.body.password,
            age: req.body.age,
            rollno: req.body.rollno,
            sid: req.body.sid
        }).then(updatedstudent => {
            req.flash('success_msg', 'You updated the student successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! editing process is failed' });
            res.render('pages/edit' , {
                errors, name, gender, email, password, age, rollno, sid
            });
        });
    },
    DeleteStudent: (req , res) => {
        var errors = [];
        User.findByIdAndDelete(req.params.id).then(deletedstudent => {
            req.flash('success_msg', 'You deleted the student successfully');
            res.redirect('/');
        }).catch(err => {
            errors.push({ msg: 'Sorry! deleting process is failed' });
            res.render('pages/show' , errors);
        });
    }
}