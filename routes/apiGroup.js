const express = require('express');
const router = express.Router();

//GET all data
router.get('/', async function (req, res, next) {
    let data;
    try {
      const [rows] = await db.query('SELECT * FROM company ORDER BY id desc');
      data = rows;
      // res.json(data);
      res.render('apiGroup', { data });
    } catch (err) {
      console.log('Errors on getting books!');
      res.render('group', { data:data });
    }
  });



module.exports = router;