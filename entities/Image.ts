import Attachment from './Attachment'
import { UniqueId } from './Unique'
import getUniqueId from '../utils/getUniqueId'

enum ImageFormat {
  JPG = 'JPG',
  PNG = 'PNG',
  SVG = 'SVG',
  GIF = 'GIF',
}

class Image implements Attachment {
  private format: ImageFormat;
  private url: string;
  private title: string;
  private id: UniqueId;

  static readonly Format = ImageFormat;

  constructor(title: string, format: ImageFormat, url: string) {
    this.title = title;
    this.url = url;
    this.format = format;
    this.id = getUniqueId();
  }

  getId(): UniqueId {
    return this.id;
  }

  getSummary(prefix: string = ''): string {
    const lines = [
      'Attachment Type: Image',
      `Title: ${this.title}`,
      `Format: ${this.format}`,
      `URL: ${this.url}`
    ]

    return lines.map(line => `${prefix}${line}`).join('\n')
  }

  upload(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export default Image;
