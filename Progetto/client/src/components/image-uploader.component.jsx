import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleConvertToGrayScale = () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    fetch("http://localhost:5000/gray-scale", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        setImageSrc(objectURL);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="table">
      <label htmlFor="file-input">Choose a .jpg or .png file:</label>
      <input
        type="file"
        id="file-input"
        name="file"
        accept=".jpg,.png"
        onChange={handleFileChange}
      />
      <button onClick={handleConvertToGrayScale}>To Gray Scale</button>
      {imageSrc && <img src={imageSrc} alt="Converted to Gray Scale" />}
    </div>
  );
}
