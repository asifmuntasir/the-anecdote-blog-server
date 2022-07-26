const express = require('express');
const router = express.Router();
const auth = require('../utils/auth')
const {
    createPost,
    updatePost,
    fetchPosts,
    fetchPost,
    updateValidations,
    updateImage
} = require("../controllers/userPostController")
router.post('/create_post', auth, createPost);
router.post('/update_post', [auth, updateValidations], updatePost);
router.post('/update_image', auth, updateImage);
router.get('/posts/:id/:page', auth, fetchPosts);
router.get('/post/:id', auth, fetchPost);

module.exports = router;