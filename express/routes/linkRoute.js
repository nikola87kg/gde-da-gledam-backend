// Dependencies
var express = require("express");
var router = express.Router();
var passport = require('passport');
require('../middleware/passport-jwt')(passport);
require('../middleware/passport-facebook')(passport);

// Controllers
const LinkController = require("../controllers/linkController")

router.get(
    "/",
    LinkController.getAll
);

router.post(
    "/",
    passport.authenticate('jwt', { session: false} ),
    LinkController.create
);

router.delete(
    "/:id",
    passport.authenticate('jwt', { session: false} ),
    LinkController.delete
);

router.put(
    "/:id",
    passport.authenticate('jwt', { session: false} ),
    LinkController.update
);

module.exports = router;
