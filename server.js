const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Middleware to enable CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
});

// Create pdfs directory if it doesn't exist
const pdfDirectory = path.join(__dirname, 'pdfs');
if (!fs.existsSync(pdfDirectory)){
    fs.mkdirSync(pdfDirectory);
    console.log('Created PDF directory at:', pdfDirectory);
}

app.get('/download-pdf', (req, res) => {
    try {
        const filePath = path.join(pdfDirectory, 'AI-Genius-AI-Prompts-For-Creators-1_230216_083125.pdf');
        
        console.log('Requested file path:', filePath);
        
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.error('File not found at:', filePath);
            return res.status(404).json({ error: 'PDF file not found' });
        }

        // Log file details
        const stats = fs.statSync(filePath);
        console.log('File details:', {
            size: stats.size,
            created: stats.birthtime,
            modified: stats.mtime
        });

        // Set headers
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=AI-Genius-AI-Prompts-For-Creators.pdf');

        // Stream the file
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on('error', (error) => {
            console.error('Stream error:', error);
            res.status(500).json({ error: 'Error streaming file' });
        });

        fileStream.on('end', () => {
            console.log('File stream completed successfully');
        });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error occurred' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log('PDF Directory location:', pdfDirectory);
    
    // List files in PDF directory
    try {
        const files = fs.readdirSync(pdfDirectory);
        console.log('Files in PDF directory:', files);
    } catch (error) {
        console.error('Error reading PDF directory:', error);
    }
});