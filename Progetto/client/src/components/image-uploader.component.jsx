import React, { useState } from 'react';

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleConvertToBlackAndWhite = () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    fetch('http://localhost:5000/black-and-white', {
      method: 'POST',
      body: formData
    })
      .then(response => response.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <label htmlFor="file-input">Choose a .jpg or .png file:</label>
      <input type="file" id="file-input" name="file" accept=".jpg,.png" onChange={handleFileChange} />
      <button onClick={handleConvertToBlackAndWhite}>To Black and White</button>
      {imageSrc && <img src={imageSrc} alt="Converted to black and white" />}
    </div>
  );
}

export default ImageUploader;