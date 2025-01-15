import React, { useEffect, useState } from "react";
import axios from "axios";

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const [title, setTitle] = useState(currentNote?.title || "");
  const [description, setDescription] = useState(currentNote?.description || "");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title || ""); // Default to empty string
      setDescription(currentNote.description || ""); // Default to empty string
    } else {
      setTitle(""); // Clear fields if no currentNote
      setDescription("");
    }
  }, [currentNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Both title and description are required.");
      return;
    }

    try {
      if (currentNote) {
        await editNote(currentNote._id, title, description);
      } else {
        await addNote(title, description);
      }
      closeModal(); // Close modal after successful action
    } catch (error) {
      console.error("Error while submitting the form:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const closeModalHandler = () => {
    setTitle("");
    setDescription("");
    closeModal(); // Call the passed closeModal function
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded">
        <h2 className="text-xl font-bold mb-4">
          {currentNote ? "Edit Note" : "Add New Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="border p-2 w-full mb-4"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Note Description"
            className="border p-2 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {currentNote ? "Update Note" : "Add Note"}
          </button>
        </form>
        <button
          className="mt-4 text-red-500"
          onClick={closeModalHandler}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
