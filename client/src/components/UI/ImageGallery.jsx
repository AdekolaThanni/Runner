import React, { useState } from "react";
import Image from "./Image";

function ImageGallery({ images }) {
  const [activeSrc, setActiveSrc] = useState(images[0]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [magnifierVisibile, setMagnifierVisible] = useState(false);
  const [[magnifierX, magnifierY], setPosition] = useState([0, 0]);
  const [[imageWidth, imageHeight], setImageDimension] = useState([0, 0]);

  const magnifierWidth = 300;
  const magnifierHeight = 300;
  const zoomLevel = 1.5;

  return (
    <div className="flex items-start lg:items-center gap-[2rem] xl:gap-[1rem] lg:gap-md flex-grow lg:w-full lg:flex-col">
      {/* Picker */}
      <div className="flex flex-col gap-md lg:flex-row">
        {images.map((image) => (
          <div
            onClick={() => setActiveSrc(image)}
            className={`${
              activeSrc === image && "border-2 border-brown"
            } w-[6rem] h-[6rem] rounded-md`}
          >
            <Image src={image} alt="" className="w-full h-full object-center" />
          </div>
        ))}
      </div>

      {/* Display */}
      <div className="basis-[80rem] lg:basis-[65rem] xs:basis-[40rem] lg:order-first lg:w-full h-[65rem] relative overflow-hidden">
        {/* Image */}
        <div
          className="w-full h-full"
          onClick={(event) => {
            if (magnifierVisibile) {
              setMagnifierVisible(false);
            } else {
              // Get image size
              const imageElement = event.currentTarget;
              const { width, height } = imageElement.getBoundingClientRect();
              setImageDimension([width, height]);
              setMagnifierVisible(true);
            }
          }}
          onMouseMove={(event) => {
            // Get image position
            const imageElement = event.currentTarget;
            const { top, left } = imageElement.getBoundingClientRect();
            const cursorX = event.pageX - left - window.pageXOffset;
            const cursorY = event.pageY - top - window.pageYOffset;

            setPosition([cursorX, cursorY]);
          }}
        >
          <Image
            src={activeSrc}
            execution={() => setImageLoaded(true)}
            alt=""
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Magnifier */}
        <div
          style={{
            display: magnifierVisibile && imageLoaded ? "" : "none",
            position: "absolute",

            // prevent magnifier blocks the mousemove event of img
            pointerEvents: "none",
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifierWidth}px`,
            // move element center to cursor pos
            top: `${magnifierY - magnifierHeight / 2}px`,
            left: `${magnifierX - magnifierWidth / 2}px`,
            opacity: "1",
            border: "2px solid lightgray",
            backgroundColor: "rgba(255,255,255,.4)",
            backgroundImage: `url('${activeSrc}')`,
            backgroundSize: `${imageWidth * zoomLevel}px ${
              imageHeight * zoomLevel
            }px`,
            backgroundPositionX: `${
              -magnifierX * zoomLevel + magnifierWidth / 2
            }px`,
            backgroundPositionY: `${
              -magnifierY * zoomLevel + magnifierHeight / 2
            }px`,
          }}
          className="rounded-full backdrop-blur-md md:!hidden"
        ></div>
      </div>
    </div>
  );
}

export default ImageGallery;
