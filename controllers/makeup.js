const express = require('express');
const router = express.Router();
const db = require('../models');
const axios = require('axios');

router.get('/', (req, res) => {
    res.render('makeup/categories');
});

// router.get('/', function(req, res) {
//     var makeupUrl = 'http://makeup-api.herokuapp.com/api/v1/products.json';
//     // Use request to call the API
//     axios.get(makeupUrl).then( function(apiResponse) {
//     console.log(apiResponse)
//       var makeup = apiResponse.data.results;
//       console.log(makeup);
//       res.render('makeup/categories', { makeup });
//     })
//   });



module.exports = router;