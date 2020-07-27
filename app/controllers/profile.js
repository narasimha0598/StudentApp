var User      = require('../models/user'),
    functions = require('../middlewares/functions');
module.exports = {
    GetStudentProfile: (req , res) => {
        User.findById(req.params.id).then(studentinfo => {
            var messages = req.flash('error');
            res.render('pages/profile' , {
                student: studentinfo,
                messages: messages
            })
        }).catch(err => {
            res.redirect('back');
        });
    }
}