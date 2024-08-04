const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/db");
const auth_route = require("./routes/auth");
const { getAllUsernames } = require("./utils/socket");
const { createServer } = require("http");
const http_server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(http_server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
require("dotenv").config();

const { PORT = 3000, MONGO_URL } = process.env; // Set a default PORT if not provided

db.run(MONGO_URL);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("", auth_route);

io.on("connection", (socket) => {
  console.log("New connection:", socket.id);

  socket.on("disconnect", () => console.log(socket.id, "disconnected"));

  socket.on("create_room", (username) => {
    socket.data.username = username;
    socket.join(username);
    socket.emit("goto_waiting_room");
    console.log("User has created room", username);
  });

  socket.on("join_room", (roomname, username) => {
    socket.data.username = username;
    socket.join(roomname);
    socket.emit("goto_waiting_room");
    console.log("User has joined room", roomname);
  });

  socket.on("get_all_users", async (roomname) => {
    console.log(roomname);
    roomname = roomname.toLowerCase();
    const sockets = await io.in(roomname).fetchSockets();
    const users = sockets.map((s) => s.data.username);
    io.in(roomname).emit("users", users);
  });

  socket.on("start_quiz", (roomname, quiz) => {
    socket.in(roomname).emit("start_quiz", quiz);
  });

  socket.on("exit_room", (roomname) => {
    socket.leave(roomname);
    socket.emit("goto_room_creation");
    socket.disconnect();
  });

  socket.on("delete", (roomname) => {
    console.log("delete");
    // socket leaves room and emit the "exit" event
    // to exit other sockets in the room
    io.in(roomname).emit("delete");
  });

  // socket.on("create_room", (userInfo) => {
  //   // // // Create a room identified by username
  //   // socket.data.room_name = socket.data.username = userInfo.username;
  //   // const room_name = socket.data.room_name;
  //   // // const insertRoom = ({ name, users }, list) => {
  //   // //   list.forEarch((elem) => {
  //   // //     if (elem.name == name) return false;
  //   // //   });
  //   // //   list.push({ name, users });
  //   // //   return true;
  //   // // };
  //   // // if (
  //   // //   insertRoom({ name: room_name, users: [userInfo.username] }, room_list)
  //   // // ) {
  //   // socket.join(room_name);
  //   // socket.emit("goto_waiting_room");
  //   // console.log("A room has been created by", room_name);
  //   // // }
  //   // console.log("Room exist:", room_name);
  //   // // return;
  // });

  // socket.on("join_room", (roomInfo, username) => {
  //   // // const roomExists = room_list.includes(roomInfo.room_name);
  //   // // if (!roomExists) {
  //   // //   console.log("Room does not exist:", roomInfo.room_name);
  //   // //   socket.emit("error", `Room ${roomInfo.room_name} does not exist.`);
  //   // //   return;
  //   // // }
  //   // console.log("A new user added to room:", roomInfo.room_name, username);
  //   // socket.data.username = username;
  //   // socket.data.room_name = roomInfo.room_name;
  //   // socket.join(roomInfo.room_name);
  //   // socket.emit("goto_waiting_room");
  // });

  socket.on("get_all_users", async (roomInfo) => {
    // try {
    //   const clients = await io.fetchSockets();
    //   const usernames = clients.map((client) => client.data.username);
    //   console.log("Users in room " + roomInfo.room_name + ":", usernames);
    //   io.to(roomInfo.room_name).emit("users", usernames);
    // } catch (error) {
    //   console.error("Error fetching users:", error);
    // }
  });

  socket.on("exit_room", async (room_name) => {
    // try {
    //   // room_list = room_list.filter((room) => room !== room_name);
    //   socket.leave(room_name);
    //   socket.emit("goto_room_creation");
    //   const clients = await io.in(room_name).fetchSockets();
    //   const usernames = clients.map((client) => client.data.username);
    //   io.to(room_name).emit("users", usernames);
    // } catch (error) {
    //   console.log("Error occurred", error);
    // }
  });
});

http_server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
