var express = require('express')
const localAuthRoutes =  require('./localAuth');
const googleAuthRoutes =  require('./googleAuth');
const facebookAuthRoutes =  require('./facebookAuth');
const apiRoutes =  require('./api');
var router = express.Router()
router.use('/auth', localAuthRoutes);
router.use('/auth', googleAuthRoutes);
router.use('/auth', facebookAuthRoutes);
router.use('/api', apiRoutes);
// fallback 404
router.use('/api', (req, res) => res.status(404).json('No route for this path'));

// export default router;

module.exports = router

/*
routes:

GET /auth/google
GET /auth/google/callback

GET /auth/facebook
GET /auth/facebook/callback

POST /auth/login
POST /auth/register
GET /auth/logout

GET api/users/me
GET /api/users/feature

*/
