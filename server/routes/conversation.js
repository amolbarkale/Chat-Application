const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conversation
router.post("/", async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});
//get new convrsation
router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    console.log("err:", err);
  }
});

//get conversation includes 2 usersId
router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conv = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conv);
  } catch (err) {
    console.log("err:", err);
  }
});
module.exports = router;
