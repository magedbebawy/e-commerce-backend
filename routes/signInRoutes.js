const router = require('express').Router();
const { signIn } = require('../controller/signinController');

router.get('/signin', signIn);

module.exports = router;