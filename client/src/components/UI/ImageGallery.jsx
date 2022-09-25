import React, { useState } from "react";
import { GlassMagnifier } from "react-image-magnifiers";
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
      {/* <GlassMagnifier
        imageSrc={activeSrc}
        imageAlt="Example"
        className="w-[80rem] h-[65rem]"
        largeImageSrc="https://us.louisvuitton.com/images/is/image/lv/1/P…BNMQ1PPC02_PM2_Front%20view.png?wid=2048&hei=2048"
        allowOverflow={true}
        magnifierSize="30%"
        magnifierBorderSize={5}
        square={false}
      /> */}
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
