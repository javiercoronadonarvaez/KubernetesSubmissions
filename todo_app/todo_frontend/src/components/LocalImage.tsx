const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const LocalImage = () => (
  <img
    src={VITE_BACKEND_URL + "/local-image"}
    alt="From Persistent Volume"
    style={{ maxWidth: "100%" }}
  />
);

export default LocalImage;
