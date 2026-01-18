 import { IKImage } from "imagekitio-react";


 const Image = ({ path, src, alt = "", className, w, h }) => {
  // Only set width/aspectRatio when w/h provided. Otherwise allow external CSS
  // (e.g. avatar sizes) to control the image size.
  const style = { display: "block" };
  if (w && h) {
    style.width = "100%";
    style.aspectRatio = `${w} / ${h}`;
  }
 


  // 1) Full external URL (http/https) -> render directly
  const externalUrl = (src && src.startsWith("http")) || (path && path.startsWith("http"));
  if (externalUrl) {
    return (
      <img src={src || path} alt={alt} className={className} style={style} loading="lazy" />
    );
  }

  // 2) Backend-served uploads -> prepend API URL (e.g. http://localhost:3000)
  const isBackendUpload = path && path.startsWith("/uploads");
  if (isBackendUpload) {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    return (
      <img src={`${apiUrl}${path}`} alt={alt} className={className} style={style} loading="lazy" />
    );
  }

  // 3) Client-local static assets (public/) e.g. /general/* -> use as-is
  const isLocalAsset = path && path.startsWith("/general");
  if (isLocalAsset) {
    return (
      <img src={path} alt={alt} className={className} style={style} loading="lazy" />
    );
  }

  // 4) Otherwise assume ImageKit path; if endpoint not set, fall back to plain img
  const urlEndpoint = import.meta.env.VITE_URL_IK_ENDPOINT;
  if (!urlEndpoint) {
    // fallback: try to render path directly
    return (
      <img src={path} alt={alt} className={className} style={style} loading="lazy" />
    );
  }

  return (
    <IKImage
      urlEndpoint={urlEndpoint}
      path={path}
      transformation={[{ width: w, height: h }]}
      alt={alt}
      className={className}
      style={style}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
    />
  );
};
export default Image; 

