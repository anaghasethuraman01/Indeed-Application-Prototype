const mysql = require('mysql');

const mysqlCon = mysql.createPool({
  host: 'indeedmysql273database.c2oqhcbfsxrv.us-west-2.rds.amazonaws.com',
  user: 'admin',
  password: 'ZlQhcaSRV1s0D1H3IUJs',
  database:'indeedMysqlDatabase',
  port: 3306
});

mysqlCon.getConnection(function(err){
	if(err) {
    console.log(err.message)
  };
	console.log("MySQL DB connected")
})

module.exports = mysqlCon;