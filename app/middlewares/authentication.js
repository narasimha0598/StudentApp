module.exports = {
    isLoggedIn: (req , res , next) => {
        if(req.isAuthenticated()){
            return next();
        }else{
            req.flash('error_msg', 'Please log in to view that resource');
            res.redirect('/login');
        }
    },
    notLoggedIn: (req , res , next) => {
        if(!req.isAuthenticated()){
            return next();
        }else{
            req.flash('msg', 'Please log out first');
            res.redirect('back');
        }
    },
    logout: (req , res , next) => {
        req.logout();
        req.flash('success_msg', 'You are logged out successfully');
        res.redirect('/');
    },
    checkNotLogged: (req , res , next) => {
        next();
    },
    isAdmin: (req, res, next) => {
        if(req.user.name == 'Admin' ||
           req.user.email == 'admin.admin@gmail.com'){
            return next();
        }else{
            req.flash('error_msg', 'Please log out first');
            res.redirect('/');
        }
    }
}