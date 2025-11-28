const VITE_BACKEND_IMAGE_URL = import.meta.env.VITE_BACKEND_IMAGE_URL;

const LocalImage = () => (
  <img
    src={VITE_BACKEND_IMAGE_URL}
    alt="From Persistent Volume"
    style={{ maxWidth: "100%" }}
  />
);

export default LocalImage;
