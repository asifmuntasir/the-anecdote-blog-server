const {body, validationResult, } = require("express-validator");

module.exports.registerValiation = [
    body("name").not().isEmpty().trim().withMessage("Name is required"),
    body("email").not().isEmpty().trim().withMessage("Email is required"),
    body("password").isLength({min: 6}).withMessage("Password must be grater than 6 character")
];


module.exports.register =  (req, res) => {
    // res.json(req.body);
    const {name, email, password} = req.body;
    // res.send(name+" "+email+" "+password);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json(errors.array());
    }else{
        res.json("All is Okay!")
    }
}