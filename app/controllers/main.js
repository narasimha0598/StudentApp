var User      = require('../models/user'),
    functions = require('../middlewares/functions');
module.exports = {
    GetHomePage: (req , res) => {
        var messages   = req.flash('error'),
            noMatch    = null,
            successMgs = req.flash('success')[0];
        if(req.query.search){
            try {
                var input  = new RegExp(
                       functions.escaperegex(req.query.search), 'gi'
                    );
                User.find({
                    $or: [
                        { name: input },
                        { gender: input }, 
                        { email: input }
                    ]
                }).then(foundstudents => {
                    if(!foundstudents){
                        noMatch = 
                         "No students match that query, please try again.";
                    }
                    res.render('pages/home', {
                        students: foundstudents,
                        noMatch: noMatch,
                        successMgs: 'Search has been done successfully',
                        noMessages: null,
                        messages: null
                    });
                }).catch(err => {
                    throw err;
                });
            } catch (err) {
                throw err;
            }
        }else{
            User.find()
            .then(students => {
                res.render('pages/home' , {
                    students: students,
                    noMatch: noMatch,
                    successMgs: successMgs,
                    noMessages: !successMgs,
                    messages: messages
                });
            }).catch(error => {
                throw error;
            });
        }
    }
}