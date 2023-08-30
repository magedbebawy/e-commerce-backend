const app = require('express')();
const PORT = process.env.PORT || 3002;
const bodyParser = require('body-parser');
const cors = require('cors');
const signinRoutes = require('./routes/signInRoutes');

app.use(bodyParser.json());
app.use(cors());

app.use('/', signinRoutes);

app.listen(PORT, () => {
    console.log('App is running on port: ' + PORT);
});