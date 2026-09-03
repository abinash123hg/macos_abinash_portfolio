import React, { useState } from "react";

export function Image({ src, alt = "", className = "", fallbackSrc = "https://media.licdn.com/dms/image/v2/D4D03AQHu8iauv0OdlA/profile-displayphoto-scale_400_400/B4DZ_ILs1ZIoAk-/0/1785769943899?e=1789603200&v=beta&t=OOZYTjy226VAOPwWen2qM1sN7U2FZai2zeoktl60x-g", ...props }) {
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
