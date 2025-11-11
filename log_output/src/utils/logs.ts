import fs from 'fs';

const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const fileAlreadyExists = async (filePath: string): Promise<boolean> =>
  new Promise((res) => {
    fs.stat(filePath, (err, stats) => {
      if (err || !stats) return res(false);
      return res(true);
    });
  });

export const getFile = async (filePath: string): Promise<string> =>
  new Promise((response, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT')
          return response('Awaiting file creation and log write up');
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

export const writeToFile = async (
  directory: string,
  filePath: string,
): Promise<void> => {
  if (!(await fileAlreadyExists(filePath))) {
    await new Promise<void>((response) =>
      fs.mkdir(directory, (err) => {
        if (err) {
          console.error('Failed to create directory:', err);
        }
        response();
      }),
    );
  }

  const randomString = generateUUID();

  // Output the string with a timestamp every 5 seconds
  setInterval(() => {
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp}: ${randomString}\n`;
    console.log(logEntry);
    fs.appendFile(filePath, logEntry, (err) => {
      if (err) console.error('Failed to append to file:', err);
    });
  }, 5000);
};
