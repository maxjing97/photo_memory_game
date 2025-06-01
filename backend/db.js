const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' });


const dbPassword = process.env.DB_PASSWORD;

//store the connection 
const connection = mysql.createConnection({
    host: 'sampler1.cq76q0u0qtke.us-east-1.rds.amazonaws.com', // Your MySQL host (default is localhost)
    user: 'admin',      // Your MySQL username
    password: `${dbPassword}`,  // Your MySQL password
    database: 'app_test_db',    // Your database name
});

connection.connect(err => {
if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
}
console.log('Connected to the database!');
}); 

module.exports = connection;