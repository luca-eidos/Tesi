import React, { useState } from "react";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileUrl, setSelectedFileUrl] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageSrcUrl, setImageSrcUrl] = useState(null);
  const [resizePerc, setResizePerc] = useState(100);
  const [brightnessPerc, setBrightnessPerc] = useState(100);
  const [contrastPerc, setContrastPerc] = useState(0);
  const [selectingCropPoints, setSelectingCropPoints] = useState(false);
  const [ulCorner, setUlCorner] = useState(null);
  const [lrCorner, setLrCorner] = useState(null);
  const [imageScaleFactor, setImageScaleFactor] = useState(1);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedFileUrl(URL.createObjectURL(file));
  };

  const handleRequest = (endpoint, args = undefined) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    if (args) formData.append("args", JSON.stringify(args));

    fetch(endpoint, {
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
          databuttontext="Select file..."
          type="file"
          id="file-input"
          name="file"
          accept=".jpg,.png"
          onChange={handleFileChange}
        />
        {imageSrcUrl && (
          <button
            onClick={() => {
              setSelectedFile(imageSrc);
              setSelectedFileUrl(imageSrcUrl);
              setSelectingCropPoints(false);
              setUlCorner(null);
              setLrCorner(null);
            }}
          >
            Load
          </button>
        )}

        <label>Parameters:</label>
        <div className="container">
          <label htmlFor="resize">Size ({resizePerc}%)</label>
          <input
            type="range"
            name="resize"
            min={1}
            max={100}
            value={resizePerc}
            onChange={(e) => setResizePerc(parseInt(e.target.value))}
          />
        </div>
        <button onClick={() => handleRequest("resize", { perc: resizePerc })}>
          Resize
        </button>

        <div className="container">
          <label htmlFor="resize">Brightness ({brightnessPerc}%)</label>
          <input
            type="range"
            name="brightness"
            min={50}
            max={150}
            defaultValue={brightnessPerc}
            onChange={(e) => setBrightnessPerc(parseInt(e.target.value))}
          />
        </div>
        <button
          onClick={() => handleRequest("brightness", { perc: brightnessPerc })}
        >
          Adjust Brightness
        </button>

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
        <button
          onClick={() => handleRequest("contrast", { perc: contrastPerc })}
        >
          Adjust Contrast ({contrastPerc})
        </button>

        <label>Commands:</label>
        <button onClick={() => handleRequest("gray-scale")}>
          To Gray Scale
        </button>
        <button onClick={() => handleRequest("sepia")}>To Sepia</button>
        <button onClick={() => handleRequest("rotate")}>Rotate 90°</button>
        <button onClick={() => handleRequest("blur")}>Blur</button>
        <button onClick={() => handleRequest("sharpen")}>Sharpen</button>
        <button onClick={() => handleRequest("convert")}>
          Convert JPG/PNG
        </button>
        <label>Crop:</label>
        <button
          onClick={() => {
            setSelectingCropPoints(true);
            setUlCorner(null);
            setLrCorner(null);
          }}
        >
          Select Crop Points
        </button>
        <button
          onClick={() => {
            if (ulCorner && lrCorner) {
              handleRequest("crop", {
                x1: Math.floor(ulCorner.x * imageScaleFactor),
                y1: Math.floor(ulCorner.y * imageScaleFactor),
                x2: Math.floor(lrCorner.x * imageScaleFactor),
                y2: Math.floor(lrCorner.y * imageScaleFactor),
              });
            }
          }}
        >
          Crop
        </button>
      </div>
      {selectedFileUrl && (
        <div className="table expand center" style={{ flexDirection: "row" }}>
          {selectedFileUrl && (
            <>
              <div className="column">
                <label>Original:</label>
                <div style={{ position: "relative" }}>
                  <img
                    src={selectedFileUrl}
                    style={{
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                    }}
                    alt="Selected"
                    onClick={(e) => {
                      if (selectingCropPoints) {
                        let rect = e.target.getBoundingClientRect();
                        let x = e.clientX - rect.left; //x position within the element.
                        let y = e.clientY - rect.top; //y position within the element.
                        console.log("Left? : " + x + " ; Top? : " + y + ".");

                        if (!ulCorner) {
                          setUlCorner({ x: Math.floor(x), y: Math.floor(y) });
                        } else {
                          if (x > ulCorner.x && y > ulCorner.x) {
                            setLrCorner({ x: Math.floor(x), y: Math.floor(y) });
                            setSelectingCropPoints(false);
                            const scale = e.target.naturalWidth / rect.width;
                            setImageScaleFactor(scale);
                          } else {
                            setUlCorner(null);
                            alert(
                              "Select Upper-left corner then Lower-right corner."
                            );
                          }
                        }
                      }
                    }}
                  />
                  {ulCorner && lrCorner && (
                    <div
                      style={{
                        position: "absolute",
                        left: ulCorner.x,
                        width: lrCorner.x - ulCorner.x,
                        top: ulCorner.y,
                        height: lrCorner.y - ulCorner.y,
                        border: "2px solid blue",
                        zIndex: 1000,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </>
          )}
          {imageSrcUrl && (
            <div className="column">
              <label>Modified:</label>
              <img
                src={imageSrcUrl}
                alt="Modified"
                style={{ position: "relative" }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
