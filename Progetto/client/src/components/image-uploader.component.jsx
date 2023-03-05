import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrcUrl, setImageSrcUrl] = useState(null);
  const [resizePerc, setResizePerc] = useState(100);
  const [brightnessPerc, setBrightnessPerc] = useState(100);
  const [contrastPerc, setContrastPerc] = useState(0);

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
        setImageSrc(blob);
        const objectURL = URL.createObjectURL(blob);
        setImageSrcUrl(objectURL);
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
            name="brightness"
            min={50}
            max={150}
            defaultValue={brightnessPerc}
            onChange={(e) => setBrightnessPerc(parseInt(e.target.value))}
          />
        </div>

        <div className="container">
          <label htmlFor="contrast">Contrast</label>
          <input
            type="range"
            name="contrast"
            min={-100}
            max={100}
            defaultValue={contrastPerc}
            onChange={(e) => setContrastPerc(parseInt(e.target.value))}
          />
        </div>

        <label>Commands:</label>
        <button onClick={() => handleRequest("gray-scale")}>
          To Gray Scale
        </button>
        <button onClick={() => handleRequest("sepia")}>To Sepia</button>
        <button onClick={() => handleRequest("rotate")}>Rotate 90°</button>
        <button onClick={() => handleRequest("resize", { perc: resizePerc })}>
          Resize
        </button>
        <button onClick={() => handleRequest("brightness", { perc: brightnessPerc })}>
          Adjust Brightness
        </button>
        <button onClick={() => handleRequest("contrast", { perc: contrastPerc })}>
          Adjust Contrast
        </button>
        <button onClick={() => handleRequest("blur")}>Blur</button>
        <button onClick={() => handleRequest("sharpen")}>Sharpen</button>
        <button onClick={() => handleRequest("convert")}>Convert JPG/PNG</button>
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
          {imageSrcUrl && (
            <>
              <label>Modified:</label>
              <img src={imageSrcUrl} alt="Modified" />
              <button
                onClick={() => {
                  setSelectedFile(imageSrc);
                  setSelectedFileUrl(imageSrcUrl);
                }}
              >
                Load
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
