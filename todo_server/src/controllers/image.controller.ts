import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import type { Response } from 'express';
import { ImageService } from '../services/image.service';

@Controller()
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('image')
  async getImage(@Res() res: Response) {
    const stream = await this.imageService.getRemoteImageStream();
    if (!stream) {
      return res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
    res.setHeader('Content-Type', 'image/jpeg');
    stream.pipe(res);
  }

  @Get('local-image')
  async getLocalImage(@Res() res: Response) {
    const stream = await this.imageService.getImageFromFile();
    if (!stream) {
      return res.status(HttpStatus.NOT_FOUND).send('Image not found');
    }
    res.setHeader('Content-Type', 'image/jpeg');
    stream.pipe(res);
  }
}
