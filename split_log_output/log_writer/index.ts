import Koa from "koa";
import path from "path";
import fs from "fs";
import "dotenv/config";

const app = new Koa();
const PORT = process.env.PORT || 3001;
console.log("PORT:", PORT);

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

// Generate a UUID v4 (RFC4122 compliant)
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const writeToFile = async (): Promise<void> => {
  await new Promise<void>((response) =>
    fs.mkdir(directory, (err) => response())
  );
  const randomString = generateUUID();

  // Output the string with a timestamp every 5 seconds
  setInterval(() => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${randomString}\n`;
    console.log(logEntry);
    fs.appendFile(filePath, logEntry, (err) => {
      if (err) console.error("Failed to append to file:", err);
    });
  }, 5000);
};

app.use(async (ctx) => {
  if (ctx.path.includes("favicon.ico")) return;
  if (ctx.path === "/write" && ctx.method === "GET") {
    await writeToFile();
    ctx.body = "Log writing started.";
    ctx.status = 200;
    return;
  }
});

console.log("Started");

app.listen(PORT);
