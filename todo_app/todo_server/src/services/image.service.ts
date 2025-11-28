import { Injectable } from '@nestjs/common';
import { Stream } from 'stream';
import { Logger } from '@nestjs/common';
import fs from 'fs';
import axios from 'axios';

const IMAGE_FILE_PATH = process.env.IMAGE_FILE_PATH || '/image.jpg';
const PICSUM_API_URL = process.env.PICSUM_API_URL || 'https://picsum.photos';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);

  /**
   * Fetches an image from local file system and returns the read stream.
   */
  public getImageFromFile(): Promise<Stream | null> {
    return new Promise((resolve) => {
      fs.access(IMAGE_FILE_PATH, fs.constants.F_OK, (err) => {
        if (err) return resolve(null);
        const stream = fs.createReadStream(IMAGE_FILE_PATH);
        resolve(stream);
      });
    });
  }

  /**
   * Fetches an image from https://picsum.photos/1200 and returns the response stream.
   */
  public async getRemoteImageStream(): Promise<Stream> {
    const response = await axios.get(PICSUM_API_URL, {
      responseType: 'stream',
    });
    this.logger.log(`Fetching remote image from ${PICSUM_API_URL}`);
    const stream = response.data as Stream;
    await this.writeImageStreamToFile(stream);
    this.logger.log('Finished writing remote image to file');
    return stream;
  }

  /**
   * Writes the provided image stream to the IMAGE_FILE_PATH file.
   */
  public async writeImageStreamToFile(stream: Stream): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(IMAGE_FILE_PATH);
      stream.pipe(writeStream);
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (err) => reject(err));
      stream.on('error', (err) =>
        reject(err instanceof Error ? err : new Error(String(err))),
      );
    });
  }

  /**
   * Fetches the remote image as a stream and saves it to IMAGE_FILE_PATH.
   */
  public async fetchAndSaveRemoteImage(): Promise<void> {
    const stream = await this.getRemoteImageStream();
    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(IMAGE_FILE_PATH);
      stream.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      stream.on('error', reject);
    });
  }
}
