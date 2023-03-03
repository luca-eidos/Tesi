import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [resizePerc, setResizePerc] = useState(100);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileUrl(URL.createObjectURL(file));
  };

  const handleRequest = (endpoint, args = undefined) => {
    // console.log(args);

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

  return (
    <div className="container">
      <div className="table">
        <label htmlFor="file-input">Choose a .jpg or .png file:</label>
        <input
          type="file"
          id="file-input"
          name="file"
          accept=".jpg,.png"
          onChange={handleFileChange}
        />
        <label>Parameters:</label>
        <div className="container">
          <label htmlFor="resize">Size (%)</label>
          <input
            type="range"
            name="resize"
            min={1}
            max={100}
            value={resizePerc}
            onChange={(e) => setResizePerc(parseInt(e.target.value))}
          />
        </div>

        <div className="container">
          <label htmlFor="resize">Brightness (%)</label>
          <input
            type="range"
            name="resize"
            min={1}
            max={100}
            defaultValue={100}
          />
        </div>

        <div className="container">
          <label htmlFor="resize">Contrast (%)</label>
          <input
            type="range"
            name="resize"
            min={1}
            max={100}
            defaultValue={50}
          />
        </div>

        <label>Commands:</label>
        <button onClick={() => handleRequest("gray-scale")}>
          To Gray Scale
        </button>
        <button onClick={() => handleRequest("sepia")}>To Sepia</button>
        <button>Rotate 90°</button>
        <button onClick={() => handleRequest("resize", { perc: resizePerc })}>
          Resize
        </button>
        <button>Blur</button>
        <button>Sharpen</button>
        <button>Convert JPG/PNG</button>
        <button>Crop</button>
      </div>
      {selectedFileUrl && (
        <div className="table expand center">
          {selectedFileUrl && (
            <>
              <label>Original:</label>
              <img src={selectedFileUrl} alt="Selected" />
            </>
          )}
          {imageSrc && (
            <>
              <label>Modified:</label>
              <img src={imageSrc} alt="Modified" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
