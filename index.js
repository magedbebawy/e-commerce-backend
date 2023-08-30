const app = require('express')();
const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const cors = require('cors');
const signinRoutes = require('./routes/signInRoutes');
const pool = require('./db');

app.use(bodyParser.json());
app.use(cors());

app.use('/', signinRoutes);

app.listen(PORT, () => {
    pool.query('SELECT NOW()', (err, res) => {
        console.log(err, res);
        pool.end();
      });
    console.log('App is running on port: ' + PORT);
});