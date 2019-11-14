const router = require('express').Router();
const ensureAuthenticated = require('../validator/authenticated.js');
const User = require('../models/User');


router.get('/:id', ensureAuthenticated, async (req, res)=>{
    from = {
        id: req.cookies['user'].id,
        name: req.cookies['user'].name
    }
    

    await (async () => {
         await User.findOne({
        where:{
            id: req.params.id
        }
        })
        .then(user=>{
         if(user){
               // console.log('the user is', user);
            to ={
                id: req.params.id,
                name: user.name
            }   
        }
        })
        .catch(err=>console.log(err))

    })();
    const info = {
        to, from
    }
    return res.render('private', {private: true, from, to, info: JSON.stringify(info)})

});

module.exports = router 