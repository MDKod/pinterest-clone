export const getImageProps = (media) => {
  if (!media) return { path: "/general/noImage.png" };
  if (typeof media !== "string") return { path: "/general/noImage.png" };
  if (media.startsWith("http")) return { src: media };
  if (media.startsWith("/uploads")) {
    const apiUrl = import.meta.env.VITE_API_URL || "";
    return { src: `${apiUrl}${media}` };
  }
  // client-local assets (public/) like /general/*
  if (media.startsWith("/general")) return { path: media };
  // default: ImageKit path
  return { path: media };
};
