// Dependencies
var express = require("express");
var router = express.Router();

// Controllers
const LinkController = require("../controllers/linkController")

router.get("/", LinkController.getAll);
router.delete("/:id", LinkController.delete);
router.put("/:id", LinkController.update);
router.post("/", LinkController.create);

module.exports = router;
