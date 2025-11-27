import fs from 'fs';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const getFile = async (filePath: string): Promise<string> =>
  new Promise((response, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') return response('File does not exist yet');
        console.log('FAILED TO READ FILE', '----------------', err);
        return reject(err);
      }
      response(data);
    });
  });

export const getLastLine = (body: string): string => {
  const lines = body.trim().split('\n');
  return lines[lines.length - 1] || '';
};

export const getCounter = (body: string): string => {
  const lastMessage = body.trim();
  console.log('Last message:', lastMessage);
  return lastMessage;
};

export const writeLogsToFile = (filePath: string): void => {
  const randomString = generateUUID();

  let timestamp = new Date().toISOString();
  let logEntry = `${timestamp}: ${randomString}\n`;
  console.log(logEntry);
  fs.appendFile(filePath, logEntry, (err) => {
    if (err) console.error('Failed to append to file:', err);
  });

  // Output the string with a timestamp every 5 seconds
  setInterval(() => {
    timestamp = new Date().toISOString();
    logEntry = `${timestamp}: ${randomString}\n`;
    console.log(logEntry);
    fs.appendFile(filePath, logEntry, (err) => {
      if (err) console.error('Failed to append to file:', err);
    });
  }, 5000);
};
