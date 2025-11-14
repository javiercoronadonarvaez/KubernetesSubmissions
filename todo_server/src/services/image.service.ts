import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { Stream } from 'stream';
import axios from 'axios';
import { Logger } from '@nestjs/common';

@Injectable()
export class ImageService {
  private readonly logger = new Logger(ImageService.name);
  private readonly imagePath = path.join(
    '/',
    'usr',
    'src',
    'app',
    'files',
    'image.jpg',
  );

  public getImageFromFile(): Promise<Stream | null> {
    return new Promise((resolve) => {
      fs.access(this.imagePath, fs.constants.F_OK, (err) => {
        if (err) return resolve(null);
        const stream = fs.createReadStream(this.imagePath);
        resolve(stream);
      });
    });
  }

  /**
   * Fetches an image from https://picsum.photos/1200 and returns the response stream.
   */
  public async getRemoteImageStream(): Promise<Stream> {
    const response = await axios.get('https://picsum.photos/1200', {
      responseType: 'stream',
    });
    this.logger.log('Fetching remote image from https://picsum.photos/1200');
    const stream = response.data as Stream;
    await this.writeImageStreamToFile(stream);
    this.logger.log('Finished writing remote image to file');
    return stream;
  }

  public async writeImageStreamToFile(stream: Stream): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(this.imagePath);
      stream.pipe(writeStream);
      writeStream.on('finish', () => resolve());
      writeStream.on('error', (err) => reject(err));
      stream.on('error', (err) =>
        reject(err instanceof Error ? err : new Error(String(err))),
      );
    });
  }

  /**
   * Fetches the remote image as a stream and saves it to imagePath.
   */
  public async fetchAndSaveRemoteImage(): Promise<void> {
    const stream = await this.getRemoteImageStream();
    await new Promise<void>((resolve, reject) => {
      const writeStream = fs.createWriteStream(this.imagePath);
      stream.pipe(writeStream);
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
      stream.on('error', reject);
    });
  }
}
