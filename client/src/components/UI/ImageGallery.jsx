import React, { useState } from "react";
import Image from "./Image";

function ImageGallery({ images }) {
  const [activeSrc, setActiveSrc] = useState(images[0]);

  return (
    <div className="flex items-start gap-[2rem]">
      {/* Picker */}
      <div className="flex flex-col gap-md">
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
      <div className="w-[80rem] h-[65rem]">
        <Image
          src={activeSrc}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}

export default ImageGallery;
