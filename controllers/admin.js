const Message = require("../models/message");

exports.deleteMessage = async (req, res, next) => {
  await Message.removeFile(req.body.filename);
  res.redirect("/messages");
};
