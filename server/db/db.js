const mongoose = require("mongoose");

const connectToMongoDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/note_app", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error Connecting to MongoDB", error.message);
  }
};

module.exports = connectToMongoDB;
