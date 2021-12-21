const router = require("express").Router();
const Message = require("../models/Message");

//add

router.post("/", async (req, res) => {
  const newMwessage = new Message(req.body);
  try {
    const savedMesssage = await newMwessage.save();
    res.status(200).json(savedMesssage);
  } catch (err) {
    console.log("err:", err);
  }
});

router.get("/:conversationId", async (req, res) => {
  try {
    const msg = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(msg);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
