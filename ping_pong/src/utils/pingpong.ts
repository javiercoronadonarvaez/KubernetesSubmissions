import fs from 'fs';

const writeToFile = async (
  filePath: string,
  counterEntry: string,
): Promise<void> => {
  await new Promise<void>((response, reject) => {
    fs.writeFile(filePath, counterEntry, (err) => {
      if (err) {
        console.error('Failed to append to file:', err);
        return reject(err);
      }
      response();
    });
  });
};

export const getFile = async (filePath: string): Promise<string> =>
  new Promise((response, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') return response('');
        console.log('FAILED TO READ FILE', '----------------', err);
        return reject(err);
      }
      response(data);
    });
  });

export const getCounter = async (
  body: string,
  filePath: string,
): Promise<string> => {
  const lastMessage = body.trim();
  console.log('Last message:', lastMessage);
  let counterMessage = '';
  if (!lastMessage) {
    counterMessage = 'Ping / Pongs: 0';
    await writeToFile(filePath, counterMessage);
    return counterMessage;
  }
  const lastCounter = parseInt(lastMessage.split(': ')[1], 10);
  counterMessage = `Ping / Pongs: ${lastCounter + 1}`;
  await writeToFile(filePath, counterMessage);
  return counterMessage;
};

export const createDirectory = async (directory: string): Promise<void> => {
  await new Promise<void>((response) =>
    fs.mkdir(directory, (err) => {
      if (err) {
        console.error('Failed to create directory:', err);
      }
      response();
    }),
  );
};
