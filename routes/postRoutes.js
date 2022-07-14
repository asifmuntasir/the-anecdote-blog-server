const express = require('express');
const router = express.Router();
const auth = require('../utils/auth')
const { createPost } = require("../controllers/userPostController")
router.post('/create_post', auth, createPost);

module.exports = router;