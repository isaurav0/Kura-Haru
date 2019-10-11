const router = require('express').Router();

router.get('/', (req, res)=>{
    res.render('greet',{title: 'KuraHaru'})
})

module.exports = router;