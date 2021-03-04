import React, { useState, useEffect } from "react";

function Image({ src, alt, className, onClick }) {
  const [source, setSource] = useState("");

  useEffect(() => {
    if (src == source) {
      console.log("img already added");
    } else {
      setSource(src);
    }
  }, [src]);

  return <img onClick={onClick} className={className} src={src} alt={alt} />;
}

export default Image;
