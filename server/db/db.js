const mongoose = require("mongoose");
require("dotenv").config();  // Import and configure dotenv

const connectToMongoDB = async () => {
  try {
    const dbUrl = process.env.MONGODB_URL;  // Get the MongoDB URL from the .env file
    if (!dbUrl) {
      throw new Error("MONGODB_URL is not defined in .env file");
    }
    await mongoose.connect(dbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error Connecting to MongoDB", error.message);
  }
};

module.exports = connectToMongoDB;
