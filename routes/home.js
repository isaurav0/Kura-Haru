const router = require('express').Router();
const checkEmpty = require('../validator/empty');
const ensureAuthenticated = require('../validator/authenticated.js')
const User = require('../models/User');


router.get('/',ensureAuthenticated, (req, res)=>{
    res.cookie('user', req.user)
    res.render('home',{title: 'Home'})
    // res.send(`Hello ${user.name}`)
})


module.exports = router