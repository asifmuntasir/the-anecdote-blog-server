const express = require('express');
const router = express.Router();
const auth = require('../utils/auth')
const { createPost, fetchPosts } = require("../controllers/userPostController")
router.post('/create_post', auth, createPost);
router.get('/posts/:id/:page', auth, fetchPosts);

module.exports = router;