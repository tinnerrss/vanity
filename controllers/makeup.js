const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');
const isLoggedin = require('../middleware/isLoggedIn');


router.get('/', isLoggedin, (req, res) => {
    db.category.findAll().then(function(categories) {
        res.render('makeup/categories', { categories });
    })
});


//show all the categories
router.get('/:name', isLoggedin, function(req, res) {
    db.makeup.findAll().then(function(makeupInfo) {
        const makeups = makeupInfo.map((makeup) => {
        if(makeup.product_type === req.params.name) {
                return makeup  
            }
        })
    res.render('makeup/show', {makeups})
    })
})

//show one makeup item
router.get('/products/:name', isLoggedin,function(req, res) {
    db.makeup.findOne({ 
        where: {name: req.params.name}
    }).then(function(makeupItem) {
        // console.log(makeupItem)
        makeupItem.getComments().then(comments =>{
            console.log(comments);
            res.render('makeup/details', {makeupItem, comments})
        })
    }).catch(function(error) {
        console.log(error)
        res.status(400).render('main/404');
      });
})

router.post('/products/:name', function(req, res) {
    db.makeup.findOne({
        where: {name: req.params.name}
    }).then((makeup)=>{
        db.comment.create({
            name: req.body.name,
            content: req.body.content,
            makeupId: req.body.makeupId
          }).then(function(comment) {
              makeup.addComment(comment);
            res.redirect(`/makeup/products/${req.params.name}`)
          })
          .catch(function(error) {
            res.status(400).render('main/404')
          })
    })
  })


module.exports = router;