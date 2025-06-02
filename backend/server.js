// server.js
const express = require('express');
const db = require('./db');  // Import the database connection
const cors = require('cors'); ///allow corss origin
const app = express();
const rateLimit = require('express-rate-limit');

const argon2 = require('argon2');

app.use(express.json());

// Apply rate limiting middleware. Limits per client. Basic DDOS protection
const limiter = rateLimit({
  windowMs: 1000, // 1 second
  max: 20, // limit each IP to 100 requests per window
  message: "Too many requests, please try again later."
}); 
app.use(limiter);


app.use(cors());  //enlabed cors

//basic post request to send data for certain condition
app.use(express.json());
app.post('/add-data', (req, res) => {
    const { lim, cond ,acc, count } = req.body; //get the assumed json body
    const query = `INSERT INTO main (limit, condition, accuracy,correct_count) VALUES (?, ?, ?, ?);`;
    db.query(query, [`${lim}`,`${cond}`,`${acc}`,`${count}`], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database query failed' });
        }
        res.status(200).json({ message: 'Item inserted successfully'});
    });
});


// Start server on port 2001
const PORT = 2001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
