const app = require('express')();
const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const cors = require('cors');
const signinRoutes = require('./routes/signInRoutes');
const pool = require('./db/db');

app.use(bodyParser.json());
app.use(cors());

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