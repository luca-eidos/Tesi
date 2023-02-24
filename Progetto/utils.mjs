import fs from 'fs';
import path from 'path';

export const tmpFolder = '/tmp/';

// create a function to handle file uploads
export const validateImage = (req, res, next) => {
  const imageFile = req.file;
  console.log(imageFile);

  // Check if there's a file in the request body
  if (!imageFile) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Check if the uploaded file is a JPEG or PNG image
  if (imageFile.mimetype !== 'image/jpeg' && imageFile.mimetype !== 'image/png') {
    return res.status(400).json({ error: 'Invalid file type. Please upload a JPEG or PNG image.' });
  }

  next();
};