import React, { useState, useRef, useEffect } from "react";
import Spinner from "./Spinner";

function Image({ src, alt, className, execution }) {
  const [loaded, setLoaded] = useState(false);
  const imageRef = useRef();

  useEffect(() => {
    imageRef.current.addEventListener("load", function () {
      setLoaded(true);
      return execution && execution();
    });
  }, []);

  return (
    <>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`${!loaded && "hidden"} ${className}`}
        crossOrigin
      />
      {!loaded && (
        <div
          className={`flex items-center justify-center bg-lightGray w-full h-full`}
        >
          <Spinner />
        </div>
      )}
    </>
  );
}

export default Image;
