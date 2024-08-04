module.exports = {
  async getAllUsernames(roomInfo) {
    try {
      const clients = await io.in(roomInfo.room_name).fetchSockets();
      const usernames = clients.map((client) => client.data.username);
      return usernames;
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
};
