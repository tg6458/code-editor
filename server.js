const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Snippet = require('./public/models/snippet');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const uri = 'mongodb://localhost:27017/snippets';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.get('/snippets', async (req, res) => {
  try {
    const snippets = await Snippet.find();
    res.json(snippets);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.get('/snippets/:id', async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);
    res.json(snippet);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/snippets', async (req, res) => {
  try {
    const { title, language, code } = req.body;
    const snippet = new Snippet({ title, language, code });
    await snippet.save();
    res.json('Snippet added!');
  } catch (err) {
    console.error(err);
    res.status(400).send('Invalid input');
  }
});

app.put('/snippets/:id', async (req, res) => {
  try{
    snippet.language = language;
    snippet.code = code;
    await snippet.save();
    res.json('Snippet updated!');
  }catch (err) {
    console.error(err);
    res.status(400).send('Invalid input');
  }
});

app.delete('/snippets/:id', async (req, res) => {
  try {
    await Snippet.findByIdAndDelete(req.params.id);
    res.json('Snippet deleted!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

