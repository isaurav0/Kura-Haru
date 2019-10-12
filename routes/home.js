const router = require('express').Router();
const checkEmpty = require('../validator/empty');
// const ensureAuthenticated = require('../validator/authenticated.js')
const User = require('../models/User');


router.get('/',ensureAuthenticated, (req, res)=>{
    var user = req.user;
    res.send(`Hello ${user.name}`)
})

function ensureAuthenticated(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/');
    }
}

module.exports = router