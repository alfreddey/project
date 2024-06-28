const express = require("express");
const db = require("./config/db");
const app = express();
require("dotenv").config();
const { PORT, MONGO_URL } = process.env;

db.run(MONGO_URL);

app.use(express.json());

app.listen(PORT, () => `Server listening on port ${PORT}`);
