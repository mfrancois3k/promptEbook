const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle PDF download
app.get('/download-pdf', (req, res) => {
  const file = path.join(__dirname, 'assets', 'AI-Genius-AI-Prompts-For-Creators-1_230216_083125.pdf');
  res.download(file, 'AI-Genius-AI-Prompts-For-Creators.pdf', (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
});

// Thank you page route
app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thank-you.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});