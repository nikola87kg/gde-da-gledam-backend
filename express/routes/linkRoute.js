// Dependencies
var express = require("express");
var router = express.Router();

// Controllers
const LinkController = require("../controllers/linkController")

router.get("/", LinkController.getAll);
router.delete("/:id", LinkController.delete);
router.post("/", LinkController.post);

module.exports = router;
