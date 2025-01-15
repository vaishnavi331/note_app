require('dotenv').config();
const express = require('express');
const connectToMongoDB = require('./db/db.js');
const authRouter = require('./routes/auth.js');
const NoteRouter = require('./routes/note.js');
const cors = require('cors');


const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/note', NoteRouter);

app.listen(5000, () => {
  connectToMongoDB();
  console.log("Server is running on port 5000");
});
