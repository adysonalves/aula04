const mysql = require('mysql');

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host:'localhost',
        port:'3306',
        user:'root',
        password:'1234',
        database:'formacao'
    });

    connection.query(sqlQry, (error, results, fields) => {
        if(error)
        res.json(error);
        else
        res.json(results);
        connection.end();
        console.log('executou!');
    });
}

module.exports = execSQLQuery;