const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const auth_route = require("./routes/auth");
const { createServer } = require("http");
const http_server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(http_server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
require("dotenv").config();

const { PORT, MONGO_URL } = process.env;

db.run(MONGO_URL);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("", auth_route);

room_list = []; // this is temp.., hence may change upon reconnection

io.on("connection", (socket) => {
  console.log(room_list);
  socket.on("create_room", (userInfo) => {
    // Gets the username of the user,
    // identifies the room with the username
    // and finally creates the room

    const room_name = userInfo.username;
    const insertRoom = (room, list) => {
      list.push(room);
    };

    // inserts the room into room_list
    // for "join_room" to read from.
    insertRoom(room_name, room_list);
    socket.join(room_name);
    socket.emit("goto_waiting_room");
    console.log("A room has been created by ", room_name);
  });

  socket.on("join_room", (roomInfo) => {
    let room = false;
    for (const r of room_list) {
      if (r == roomInfo.room_name) {
        room = true;
        break;
      }
    }

    if (!room) {
      console.log("Room does not exist: ", roomInfo.room_name);
      socket.emit("error", `Room ${roomInfo.room_name} does not exist.`);
      return;
    }
    socket.join(roomInfo.room_name);
    socket.emit("goto_waiting_room");
    console.log("A new user added to room: " + roomInfo.room_name);
  });
});

http_server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
