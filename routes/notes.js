const router = require('express').Router();
const fs = require('fs');
const path = require('path');

// Retrieve notes from db.json
router.get('/notes', (req, res) => {
  fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

// Add new note to db.json
router.post('/notes', (req, res) => {
  const newNote = req.body;
  fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const lastId = notes.length > 0 ? notes[notes.length - 1].id : 0;
    const newId = lastId + 1;
    const noteWithId = { ...newNote, id: newId };
    notes.push(noteWithId);
    fs.writeFile(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify(notes),
      (err) => {
        if (err) throw err;
        res.json(noteWithId);
      }
    );
  });
});

// Delete a note from db.json
router.delete('/notes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  fs.readFile(path.join(__dirname, '../db/db.json'), (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const filteredNotes = notes.filter((note) => note.id !== id);
    fs.writeFile(
      path.join(__dirname, '../db/db.json'),
      JSON.stringify(filteredNotes),
      (err) => {
        if (err) throw err;
        res.json({ message: 'Note deleted' });
      }
    );
  });
});

module.exports = router;
