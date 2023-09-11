const router = require('express').Router();
const { signIn, signUp, logOut, validateToken } = require('../controller/signinController');

router.post('/signin', signIn);

router.post('/signup', signUp);

router.post('/logout', logOut);

router.post('/validate', validateToken);

module.exports = router;