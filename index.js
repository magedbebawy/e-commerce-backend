const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 3002;
const cors = require('cors');
const signinRoutes = require('./routes/signInRoutes');
const pool = require('./db/db');

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(cookieParser());

app.use('/', signinRoutes);

// close any pending pool connections 
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing PG pool');
    pool.end(() => {
      console.log('Pool has ended');
      process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log('App is running on port: ' + PORT);
});