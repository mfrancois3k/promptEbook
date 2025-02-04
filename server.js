const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

export const config = {
    api: {
      responseLimit: '50mb',
      bodyParser: false,
    },
  };
  
  export default async function handler(req, res) {
      const GOOGLE_DRIVE_URL = 'https://drive.google.com/file/d/1AjXetu6N3HZVbTtnbONFZTE89gy3uOLK/view?usp=sharing';
  
      try {
          const response = await fetch(GOOGLE_DRIVE_URL);
          if (!response.ok) throw new Error('Failed to fetch PDF');
          
          const pdfData = await response.blob();
          
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=AI-Genius-AI-Prompts-For-Creators.pdf');
          
          const arrayBuffer = await pdfData.arrayBuffer();
          res.send(Buffer.from(arrayBuffer));
      } catch (error) {
          res.status(500).json({ error: 'Error downloading file' });
      }
  }