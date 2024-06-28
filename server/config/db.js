const mongoose = require("mongoose");

async function run(uri) {
  try {
    await mongoose.connect(uri);
    console.dir("MongoDB connected.");
  } catch (err) {
    console.dir(err.message);
  }
}

module.exports = { run };
