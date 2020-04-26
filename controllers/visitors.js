const Message = require("../models/message");

exports.getMessages = async (req, res, next) => {
  const messageList = await Message.fetchAll();
  res.render("message-log", {
    docTitle: "Message Log",
    messageList: messageList,
    path: "/messages",
    tableStyle: true,
    activeLog: true,
    clickHandler: function (filename) {
      return function (event) {
        alert(filename);
      };
    },
  });
};

exports.getCreateMessage = (req, res, next) => {
  res.render("create-message", {
    docTitle: "Message Form",
    path: "/create-message",
    formStyle: true,
    activeForm: true,
  });
};

exports.postSendMessage = (req, res, next) => {
  const message = new Message(req.body.message);
  message.save();
  res.redirect("/messages");
};

exports.getRoot = (req, res, next) => {
  res.render("home", { docTitle: "Message Hub", path: "/", activeHome: true });
};
