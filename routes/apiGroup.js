const { response } = require('express');
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


// add a new book
router.post('/add', async function (req, res, next) {
  // res.send('Add a new book.')
  const group = req.body.group;
  const company = req.body.company;
  const time = req.body.time;

  const form_data = {
    group: group,
    company: company,
    time: time,
  };

  try{
    //await db.query('INSERT INTO company SET ?', form_data);
    
    const reaponse = await fetch('http://localhost:1337/group',{
      method: 'post',
      body: JSON.stringify(form_data),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    res.redirect('/apiGroup');
  } catch (err){
    console.log(err);
    res.render('/apiGroup/add',{
      group: form_data.group,
      company: form_data.company,
      time: form_data.time,
    });
  }
});


// display edit book page
router.get('/edit/:id', async function (req, res, next) {
  //res.send('display edit book page');
  const id = req.params.id;
  try{
    const reaponse = await fetch(`http://localhost:1337/group/${id}`);
    const data = await response.json();
   // const [rows] = await db.query('SELECT * FROM company WHERE id = ?',[id]);
    res.render('apiGroup/edit',{
      id: data.id,
      group: data.name,
      company: data.company,
      time: data.time,
    });
  }catch (err) {
    console.log(err);
  }
});


// update book data
router.post('/update', async function (req, res, next) {
  //res.send('update book data');
  const group = req.body.group;
  const company = req.body.company;
  const time = req.body.time;
  const id = req.body.id;

  try{
    /*
    await db.query('UPDATE company SET company.group = ?, company = ?, time = ? WHERE id = ? ', [
      group,
      company,
      time,
      id,
    ]);     */
    //res.status(200).json({message: 'Updating successful'});
    res.redirect('/group');
  } catch (err){
    console.log(err);
  }
});


module.exports = router;