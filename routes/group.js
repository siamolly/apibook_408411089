const express = require('express');
const router = express.Router();
const db = require('../lib/db');

router.get('/', async function (req, res, next) {
  let data;
  try {
    const [rows] = await db.query('SELECT * FROM company ORDER BY id desc');
    data = rows;
    // res.json(data);
    res.render('group', { data });
  } catch (err) {
    console.log('Errors on getting books!');
    res.render('group', { data:data });
  }
});

// display add book page
router.get('/add', async function (req, res, next) {
  // res.send('display add book page')

  res.render('group/add',{
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
    await db.query('INSERT INTO company SET ?', form_data);
    res.redirect('/group');
  } catch (err){
    console.log(err);
    res.render('/group/add',{
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
    const [rows] = await db.query('SELECT * FROM company WHERE id = ?',[id]);
    res.render('group/edit',{
      id: rows[0].id,
      group: rows[0].name,
      company: rows[0].company,
      time: rows[0].time,
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
    await db.query('UPDATE company SET company.group = ?, company = ?, time = ? WHERE id = ? ', [
      group,
      company,
      time,
      id,
    ]);
    //res.status(200).json({message: 'Updating successful'});
    res.redirect('/group');
  } catch (err){
    console.log(err);
  }
});

// delete book
router.delete('/delete/:id', async function (req, res, next) {
  let id = req.params.id;

  try {
    await db.query('DELETE FROM company WHERE id = ?', [id]);
  } catch (err) {
    console.log(err);
  }
  res.redirect('/group');
});

module.exports = router;
