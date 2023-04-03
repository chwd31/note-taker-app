const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

router.get('/', (req, res) => {
  const data = fs.readFileSync('./db/db.json');
  const notes = JSON.parse(data);
  res.json(notes);
});

router.post('/', (req, res) => {
  const newNote = req.body;

  const data = fs.readFileSync('./db/db.json');
  const notes = JSON.parse(data);

  notes.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));

  res.json(newNote);
});

router.delete('/:id', (req, res) => {
  const noteId = req.params.id;

  const data = fs.readFileSync('./db/db.json');
  const notes = JSON.parse(data);

  const filteredNotes = notes.filter((note) => note.id !== noteId);

  fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));

  res.json({ message: 'Note deleted' });
});

module.exports = router;
