const express = require('express');
const bodyParser = require('body-parser');
const Song = require('./models/Song');
const connectDb = require('./config/db');

connectDb();

const app = express();
app.use(bodyParser.json());

app.post('/api/submit/song', async (req, res) => {
  try {
    const { name, artistName, youtubeLink, thumbnail } = req.body;
    const newSong = new Song({ name, artistName, youtubeLink, thumbnail });
    await newSong.save();
    res.json({ msg: 'Song has been saved' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

app.get('/api/getAll', async (req, res) => {
  try {
    const songs = await Song.find();
    res.json({ songs });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

app.delete('/api/delete/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Song.findByIdAndDelete(id);
    res.json({ msg: 'Song Deleted successfully' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Internal Server Error' });
  }
});

app.listen(5000, () => {
  console.log('App is running at port 5000');
});
