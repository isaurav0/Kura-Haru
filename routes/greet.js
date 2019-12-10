const router = require('express').Router();
const checkEmpty = require('../validator/empty');
const User = require('../models/User');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const bcrypt = require('bcrypt');


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
                var validity = bcrypt.compareSync(password, user.password);
                if(!validity){
                    return done(null, false, {message: 'Incorrect Password'})
                }
                else
                    return done(null, user) 
                
                // if(hash==user.password){
                //    console.log('matched')
                //     return done(null, user)
                // }
                // else{
                //     console.log('password not matched')
                //     return done(null, false , {message: 'incorrect password'})
                // }
            })
            .catch(err=>console.log(err))
    }
));

passport.serializeUser(function(user, done) {
    // console.log("deserializer")
    done(null, user.username);
});

passport.deserializeUser(function(username, done) {
    // console.log("Deserializer Called");
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