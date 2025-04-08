const express = require('express');
const mongoose = require('mongoose');
const ShortUrl = require('./models/shortUrl');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Set view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

// Home route
app.get('/', async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render('index', { shortUrls: shortUrls });
});

// Create short URL
app.post('/shortUrls', async (req, res) => {
  const { fullUrl } = req.body;
  await ShortUrl.create({ full: fullUrl });
  res.redirect('/');
});

// Redirect to original URL
app.get('/:shortUrl', async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);
  
  shortUrl.clicks++;
  shortUrl.save();
  
  res.redirect(shortUrl.full);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});