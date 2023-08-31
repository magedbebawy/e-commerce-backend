const router = require('express').Router();
const { signIn, signUp } = require('../controller/signinController');

router.get('/signin', signIn);

router.post('/signup', signUp);

module.exports = router;