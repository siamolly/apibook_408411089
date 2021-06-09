const mysql = require('mysql2');

const pool = mysql.createPool({ 
  host:'localhost', 
  user: 'root', 
  password: '82861516',
  database: 'dbdemo'
})

module.exports = pool.promise();
