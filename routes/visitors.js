const router = require("express").Router();

const visitorsControl = require("../controllers/visitors.js");

router.get("/create-message", visitorsControl.getCreateMessage);

router.post("/send-message", visitorsControl.postSendMessage);

router.get("/messages", visitorsControl.getMessages);

router.get("/", visitorsControl.getRoot);

module.exports = router;
