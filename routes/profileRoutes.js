const express = require('express');
const router = express.Router();
const auth = require('../utils/auth');

const { updateName } = require('../controllers/profileRoutes');


router.post('/update_name', auth, updateName);

module.exports = router;