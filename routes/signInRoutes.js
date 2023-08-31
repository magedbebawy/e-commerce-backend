const router = require('express').Router();
const { signIn, signUp } = require('../controller/signinController');

router.post('/signin', signIn);

router.post('/signup', signUp);

module.exports = router;