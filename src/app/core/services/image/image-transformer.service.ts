import {Injectable} from '@angular/core';

@Injectable()
export class ImageTransformerService {

  constructor() {
  }

  public convertImage(myFile: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const fileReader = new FileReader();
      if (fileReader && myFile) {
        fileReader.readAsBinaryString(myFile);
        fileReader.onload = () => {
          const binaryString = fileReader.result as string;
          resolve(btoa(binaryString));
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      } else {
        reject('No file provided');
      }
    });
  }
}
