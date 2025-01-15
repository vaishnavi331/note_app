const express = require('express');
const Note = require('../models/Note.js');
const middleware = require('../middleware/middleware');
const router = express.Router();

// Add a new note
router.post('/add', middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id, // From middleware
    });

    await newNote.save();
    return res
      .status(200)
      .json({ success: true, message: 'Note created successfully', note: newNote });
  } catch (error) {
    console.error('Error adding note:', error.message);
    return res.status(500).json({ success: false, message: 'Error in adding note' });
  }
});

// Get all notes for the authenticated user
router.get('/', middleware, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    console.error('Error retrieving notes:', error.message);
    return res.status(500).json({ success: false, message: 'Cannot retrieve notes' });
  }
});

// Update a note by ID
router.put('/:id', middleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    // Update the note and return the updated document
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, description },
      { new: true } // Ensures the updated note is returned
    );

    if (!updatedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Note updated successfully', updatedNote });
  } catch (error) {
    console.error('Error updating note:', error.message);
    return res.status(500).json({ success: false, message: 'Error updating note' });
  }
});

// Delete a note by ID
router.delete('/:id', middleware, async (req, res) => {
  try {
    const { id } = req.params;

    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ success: false, message: 'Note not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Note deleted successfully', deletedNote });
  } catch (error) {
    console.error('Error deleting note:', error.message);
    return res.status(500).json({ success: false, message: 'Error deleting note' });
  }
});

module.exports = router;
