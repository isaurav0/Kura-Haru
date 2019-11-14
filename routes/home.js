const router = require('express').Router();
const checkEmpty = require('../validator/empty');
const ensureAuthenticated = require('../validator/authenticated.js')
const User = require('../models/User');


router.get('/',ensureAuthenticated, (req, res)=>{
    res.cookie('user', req.user)
    var muji = [1]
    var users = []
    User.findAll().then(results=>{
        results.forEach(user => {
            data = {}
            data['id'] = user.id
            data['name'] = user.name 
            users.push(data)
        });
        // res.send(users)
        res.render('home',{title: 'Home',users})
    })
    .catch(err=>res.send('database query error'))
    

    // res.send(`Hello ${user.name}`)
})


module.exports = router