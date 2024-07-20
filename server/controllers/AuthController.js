const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
module.exports = {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ err: "No user info received." });
      }

      const db_user = await UserModel.findOne({ email });

      if (!db_user) {
        return res.status(400).json({ err: "User does not exist." });
      }

      const authenticated = await db_user.comparePassword(password);

      if (!authenticated) {
        return res.status(400).json({ err: "Wrong password or email" });
      }

      const token = jwt.sign(
        { email: db_user.email, id: db_user._id },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: 24 * 60 * 60 }
      );

      res.json({ token });
    } catch (error) {
      console.error("Error during login: ", error);
      res.status(500).json({ err: "Internal server error" });
    }
  },

  async register(req, res) {
    try {
      const formData = req.body;

      if (!formData || !formData.password || !formData.email) {
        res.json({
          err: "Received no user info",
        });
      }

      const user = await UserModel.create(req.body);

      if (user) {
        const token = jwt.sign(
          { email: user.email, id: user._id },
          process.env.TOKEN_SECRET_KEY,
          { expiresIn: 24 * 60 * 60 }
        );

        res.json({
          token,
        });
      } else {
        res.json({
          err: "User not created.",
        });
      }
    } catch (err) {
      res.json({
        err: err.message,
      });
    }
  },
};
