const router = require('express').Router();
const checkEmpty = require('../validator/empty');
const bcrypt = require('bcrypt');
const saltRounds = 10;



router.get('/', (req, res)=>{
    res.render('signup',{title: 'KuraHaru', errors: req.flash('errors')})
})

router.post('/', (req, res)=>{
    var fullName = req.body.fullname;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var repassword = req.body.repassword;
    var errors = {}
    if(checkEmpty(fullName)){
        errors.fullname = 'FullName Empty <br>'
    }
    if(checkEmpty(username)){
        errors.username = 'Username Empty <br>'
    }
    if(checkEmpty(password)){
        errors.password = 'Password Empty <br>'
    }
    if(password!==repassword){
        errors.password = 'Password Dont match <br>'
    }
    if(!checkEmpty(errors)){
        // req.flash('errors', 'there are some errors ')
        res.render('signup', {title: 'KuraHaru', errors:errors})
        // res.redirect('/signup')
    }
        
    else{
    
        
    }

    });

module.exports = router;


// const salt = bcrypt.genSaltSync(saltRounds);
// const hash = bcrypt.hashSync(password, salt);