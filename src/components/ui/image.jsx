import React, { useState } from "react";

export function Image({ src, alt = "", className = "", fallbackSrc = "/assets/images/abinash-profile-192.webp", ...props }) {
  const [imgSrc, setImgSrc] = useState(src || fallbackSrc);

  return (
    <img
      src={imgSrc || fallbackSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
        }
      }}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}

export default Image;
