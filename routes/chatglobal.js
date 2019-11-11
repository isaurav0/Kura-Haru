const router = require('express').Router();
const ensureAuthenticated = require('../validator/authenticated.js')

router.get('/', ensureAuthenticated, (req, res)=>{
    var name = req.cookies['user'].name
    res.render('globalchat', {title: 'Global Kuraharu', name})
});

module.exports = router 