import fs from 'fs';
import path from 'path';

export const tmpFolder = '/tmp/';

// create a function to handle file uploads
export const uploadImage = (req, res, next) => {
  const imageFile = req.body.image;
  console.log(req.body);

  // Check if there's a file in the request body
  if (!imageFile) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  // Check if the uploaded file is a JPEG or PNG image
  if (imageFile.mimetype !== 'image/jpeg' && imageFile.mimetype !== 'image/png') {
    return res.status(400).json({ error: 'Invalid file type. Please upload a JPEG or PNG image.' });
  }

  // Save the uploaded file to disk
  const fileName = `${Date.now()}-${imageFile.originalname}`;
  const filePath = path.join(tmpFolder, fileName);
  fs.writeFile(filePath, imageFile.buffer, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving file.' });
    }
    req.imagePath = filePath;
    next();
  });
};