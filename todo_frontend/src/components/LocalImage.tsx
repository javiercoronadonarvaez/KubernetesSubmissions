const backendUrl = "http://localhost:8081/local-image";

const LocalImage = () => (
  <img
    src={backendUrl}
    alt="From Persistent Volume"
    style={{ maxWidth: "100%" }}
  />
);

export default LocalImage;
