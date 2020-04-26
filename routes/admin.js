const router = require("express").Router();

const adminControl = require("../controllers/admin");

router.delete("/delete-message", adminControl.deleteMessage);

module.exports = router;
