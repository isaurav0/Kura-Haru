const router = require('express').Router(); const checkEmpty = require('../validator/empty'); const User = require('../models/User');
const bcrypt = require('bcrypt');


router.get('/', (req, res)=>{
    res.render('signup',{title: 'KuraHaru', errors: req.flash('errors')})
    User.findAll()
        .then(user=>console.log(user))
        .catch(err=>console.log(err))
})

router.post('/', (req, res)=>{
    var fullName = req.body.fullname;
    var username = req.body.username.toLowerCase();
    var email = req.body.email.toLowerCase();
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
        User.findOne({
            where: {
                username: username
            }
        })
            .then(user=>{
                if(user){
                    errors.username = "Username Already Exists"
                    res.render('signup', {title: 'KuraHaru', errors:errors})
                }

                else{
                    User.findOne({
                        where:{
                            email: email
                        }
                    })
                    .then(user=>{
                            if(user){
                                errors.email = "Email has already been registered"
                                res.render('signup', {title: 'KuraHaru', errors:errors})
                            }
                            else{
                                const salt = bcrypt.genSaltSync(10);
                                const hash = bcrypt.hashSync(password, salt);
                                User.create({name: fullName, username, email, password:hash})
                                    .then(()=>{
                                        console.log('created new user: ',username);
                                        console.log('hash: ',hash );                    
                                        res.redirect('/')
                                    })
                                    .catch(err=>console.log(err))
                            }
                        })
                        .catch(err=>console.log(err))   
                }
            })
        }
});

module.exports = router; 