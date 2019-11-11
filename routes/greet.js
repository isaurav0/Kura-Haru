const router = require('express').Router();
const checkEmpty = require('../validator/empty');
const User = require('../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const bcrypt = require('bcrypt');
const saltRounds = 10;


router.get('/', (req, res)=>{
    res.render('greet',{title: 'KuraHaru'});
});


passport.use(new LocalStrategy(
    function(username, password, done){
        User.findOne({
            where:{
                username: username
            }
        })
            .then((user)=>{
                if(!user){
                    console.log('not user')
                    return done(null, false, {message: 'Incorrect Username'})
                }
                const salt = bcrypt.genSaltSync(saltRounds)
                const hash = bcrypt.hashSync(password, salt);
                console.log('hash -> ', hash)
                console.log('password -> ', user.password)
                // console.log('From passport: ',user)
                bcrypt.compare(hash, user.password, (err, isMatch)=>{
                    if(err){
                        console.log(err)
                        return done(null, false, {message: 'Incorrect Password'})
                    }
                    return done(null, user)
                });
                
            })
            .catch(err=>console.log(err))
    }
));

passport.serializeUser(function(user, done) {
    console.log("deserializer")
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    console.log("Deserializer Called");
    User.findOne({
        where: {
            username: username
        }
    })
        .then((user)=>{
            done(null, user);
        })
        .catch(err=>done(err,null))
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/', failureFlash: true}),(req, res)=>{
    res.redirect('/home');
});

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/');
    }
}

router.get('/logout', ensureAuthenticated, (req, res)=>{
    req.logout();
    res.redirect('/');
})



// router.post('/login', (req, res)=>{
//     var username = req.body.username.toLowerCase();
//     var password = req.body.password;
//     var errors = {}

//     if(checkEmpty(username)){
//         errors.username = 'Username Empty <br>'
//     }
//     if(!checkEmpty(errors)){
//         res.render('greet', {title: 'KuraHaru', errors:errors})
//     } 
//     else{
//         User.findOne({
//             where:{
//                 username: username
//             }
//         })
//             .then(user=>{
//                 if(user){
//                     res.send(username)
//                 }
//                 else
//                     res.send("Fuck off")
//             })
//     } 
// });

module.exports = router;
