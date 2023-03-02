import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileUrl(URL.createObjectURL(file));
  };

  const handleRequest = (endpoint, args = undefined) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    if (args) formData.append("args", JSON.stringify(args));

    fetch("http://localhost:5000/" + endpoint, {
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

  const handleConvertToGrayScale = () => {
    handleRequest("gray-scale");
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
      {selectedFileUrl && <img src={selectedFileUrl} alt="Selected" />}
      {imageSrc && <img src={imageSrc} alt="Converted to Gray Scale" />}
    </div>
  );
}
