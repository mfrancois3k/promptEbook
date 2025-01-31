// server.js
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Custom Error Handler Class
class CustomError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

// Serve static files directly from the root directory
app.use(express.static(__dirname));

// Serve the main HTML page
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ChatGPT Prompt Library</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                margin: 0;
                padding: 0;
            }
            
            #wrapper {
                max-width: 1200px;
                margin: 0 auto;
                padding: 20px;
            }
            
            .inner {
                padding: 20px;
            }
            
            .image {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .frame img {
                max-width: 100%;
                height: auto;
            }
            
            .style3 {
                text-align: center;
                color: #333;
                margin-bottom: 20px;
            }
            
            .style1 {
                text-align: center;
                color: #666;
                max-width: 800px;
                margin: 0 auto 30px;
            }
            
            .download-button {
                text-align: center;
            }
            
            .button {
                display: inline-block;
                padding: 15px 30px;
                background-color: #007bff;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                transition: background-color 0.3s;
            }
            
            .button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div id="wrapper">
            <div id="main">
                <div class="inner">
                    <header id="header"></header>
                    <section id="home-section">
                        <div id="image01" class="image">
                            <span class="frame">
                                <img src="https://storage.ko-fi.com/cdn/useruploads/display/739f9019-c768-4551-a9a3-d434cb12c5a5_chatgptpromptlibrary.jpg" alt="ChatGPT Prompt Library">
                            </span>
                        </div>
                        <h2 id="text04" class="style3"><strong>Unleash Your Creativity, One Prompt at a Time.</strong></h2>
                        <p id="text05" class="style1">
                            Transform your creative process with the ultimate collection of over 1000 expertly crafted ChatGPT prompts. Whether you're a writer, teacher, programmer, or marketer, this library will help you spark fresh ideas, save time, and produce outstanding content effortlessly.
                            <br><br>
                            Get instant access to the ChatGPT Prompt Library and supercharge your creativity today!
                        </p>
                        <div class="download-button">
                            <a href="/download-pdf" class="button">Download PDF</a>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </body>
    </html>
  `);
});

// Handle PDF download with error handling
app.get('/download-pdf', (req, res, next) => {
  const filePath = path.join(__dirname, 'AI-Genius-AI-Prompts-For-Creators-1_230216_083125.pdf');
  
  console.log('Attempting to download file from:', filePath);
  
  // Check if file exists
  if (!fs.existsSync(filePath)) {
    console.error('File not found at path:', filePath);
    return next(new CustomError(404, 'PDF file not found'));
  }

  res.download(filePath, 'AI-Genius-AI-Prompts-For-Creators.pdf', (err) => {
    if (err) {
      console.error('Download error:', err);
      return next(new CustomError(500, 'Error: Unable to download the PDF file'));
    }
    console.log('File download completed successfully');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log('Current directory:', __dirname);
});