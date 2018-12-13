// Dependencies
var express = require("express");
var router = express.Router();

// Controllers
const LinkController = require("../controllers/linkController")

router.post("/link", LinkController.getAll);
router.post("/link", LinkController.post);

module.exports = router;
