var express           = require('express'),
    router            = express.Router(),
    bodyParser        = require('body-parser'),
    parseUrlencoded   = bodyParser.urlencoded({ extended: true }),
    methodOverride    = require('method-override'),
    authentication    = require('./middlewares/authentication'),
    signupcontroller  = require('./controllers/signup'),
    signincontroller  = require('./controllers/login'),
    profilecontroller = require('./controllers/profile'),
    maincontroller    = require('./controllers/main'),
    newcontroller     = require('./controllers/new'),
    editcontroller    = require('./controllers/edit');
router.use(methodOverride('_method'));
router.get('/', parseUrlencoded, maincontroller.GetHomePage);
router.get('/:id/profile', parseUrlencoded, profilecontroller.GetStudentProfile);
router.get('/logout', parseUrlencoded, authentication.isLoggedIn,
                                       authentication.logout);
router.get('/signup', parseUrlencoded, authentication.isLoggedIn,
                                       authentication.isAdmin,
                                       signupcontroller.GetSignUpPage);
router.post('/signup', parseUrlencoded, signupcontroller.PostSignUpPage);
router.get('/login', parseUrlencoded, authentication.notLoggedIn,
                                      signincontroller.GetSignInPage);
router.post('/login', parseUrlencoded, signincontroller.PostSignInPage);
router.use('/login', parseUrlencoded, authentication.notLoggedIn, 
                                      authentication.checkNotLogged);
router.get('/new', parseUrlencoded, authentication.isLoggedIn,
                                    newcontroller.GetNewStudentPage);
router.post('/new', parseUrlencoded, authentication.isLoggedIn,
                                     newcontroller.PostNewStudentPage);
router.get('/:id/edit', parseUrlencoded, authentication.isLoggedIn,
                                         editcontroller.EditStdInfo);
router.put('/:id', parseUrlencoded, authentication.isLoggedIn,
                                    editcontroller.PutStdInfo);
router.delete('/:id', parseUrlencoded, authentication.isLoggedIn,
                                       editcontroller.DeleteStudent);
module.exports = router;