const express = require('express');
const path = require('path');
const fs = require('fs');
const notesRouter = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/notes', notesRouter);

// Middleware for serving static files
app.use(express.static('public'));

// Routes for HTML pages
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, 'public', 'index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'notes.html'))
);


// Routes for API
app.get('/routes/notes', (req, res) => {
  const data = fs.readFileSync('./db/db.json');
  const notes = JSON.parse(data);
  res.json(notes);
});

app.post('/routes/notes', (req, res) => {
  const newNote = req.body;

  const data = fs.readFileSync('./db/db.json');
  const notes = JSON.parse(data);

  notes.push(newNote);

  fs.writeFileSync('./db/db.json', JSON.stringify(notes));

  res.json(newNote);
});

app.delete('/routes/notes/:id', (req, res) => {
  const noteId = req.params.id;

  const data = fs.readFileSync('./db/db.json');
  const notes = JSON.parse(data);

  const filteredNotes = notes.filter((note) => note.id !== noteId);

  fs.writeFileSync('./db/db.json', JSON.stringify(filteredNotes));

  res.json({ message: 'Note deleted' });
});

// Start the server
app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);
