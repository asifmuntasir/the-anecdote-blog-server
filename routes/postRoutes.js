const express = require('express');
const router = express.Router();
const { createPost } = require("../controllers/userPostController")
router.post('/create_post', createPost);

module.exports = router;