const app =  require("express");
const router = app.Router();
const {register, registerValiation} = require('../controllers/userController');
router.post("/register", registerValiation, register);

module.exports = router;

