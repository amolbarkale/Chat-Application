const io = require("socket.io")(8900, {
  core: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users: users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  console.log("connection triggered");
  //take user id and socket id from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);

    io.emit("getUsers", users);
  });

  //send and get msg
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("get Message", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    console.log("somebody is disconnect:");
    removeUser(socket.id);
  });
});
