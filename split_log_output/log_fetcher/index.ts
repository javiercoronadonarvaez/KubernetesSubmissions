import Koa from "koa";
import path from "path";
import fs from "fs";
import "dotenv/config";

const app = new Koa();
const PORT = process.env.PORT || 3000;

const directory = path.join("/", "usr", "src", "app", "files");
const filePath = path.join(directory, "logs.txt");

const getFile = async (): Promise<string> =>
  new Promise((response, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        console.log("FAILED TO READ FILE", "----------------", err);
        return reject(err);
      }
      response(data);
    });
  });

const getLastLine = (body: string): string => {
  const lines = body.trim().split("\n");
  return lines[lines.length - 1] || "";
};

app.use(async (ctx) => {
  if (ctx.path.includes("favicon.ico")) return;
  if (ctx.path === "/fetch" && ctx.method === "GET") {
    const fileContent = await getFile();
    const lastLine = getLastLine(fileContent);
    ctx.body = lastLine;
    console.log("Last line:", lastLine);
    return;
  }
});

console.log("Started");

app.listen(PORT);
