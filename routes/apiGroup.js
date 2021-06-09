const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

//GET all data
router.get('/', async function (req, res, next) {
    let data;
    try {
      const response = await fetch('http://localhost:1337/group');
      const data = await response.json();
      
      res.render('apiGroup/index', { data });
    } catch (err) {
      console.log('Errors on getting books!');
      res.render('apiGroup/index', { data:'' });
    }
  });
  
// display add book page
router.get('/add', async function (req, res, next) {
  // res.send('display add book page')

  res.render('apiGroup/add',{
    group:'',
    company:'',
    id:'',
  });
});


module.exports = router;