// Generate a UUID v4 (RFC4122 compliant)
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Store the random string in memory
const randomString = generateUUID();

// Output the string with a timestamp every 5 seconds
setInterval(() => {
  const timestamp = new Date().toISOString();
  console.log(`${timestamp}: ${randomString}`);
}, 5000);
