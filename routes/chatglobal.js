const router = require('express').Router();
const ensureAuthenticated = require('../validator/authenticated.js')

router.get('/', ensureAuthenticated, (req, res)=>{
    res.render('globalchat', {title: 'Global Kuraharu', name: JSON.stringify(req.cookies['user'].username)})
});


module.exports = router 