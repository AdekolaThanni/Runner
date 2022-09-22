import React, { useState, useRef, useEffect } from "react";
import Spinner from "./Spinner";

function Image({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    imageRef.current.addEventListener("load", function () {
      setLoaded(true);
    });
  }, []);
  return (
    <div className="w-full h-fit">
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`${!loaded && "hidden"} ${className}`}
      />
      {!loaded && (
        <div
          className={`flex items-center justify-center bg-lightGray ${className}`}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}

export default Image;
