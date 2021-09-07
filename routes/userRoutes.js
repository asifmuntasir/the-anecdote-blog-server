const app =  require("express");
const router = app.Router();
router.post("/register", (req, res) => {
    res.send("Hello register")
});

module.exports = router;

