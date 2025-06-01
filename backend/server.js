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
