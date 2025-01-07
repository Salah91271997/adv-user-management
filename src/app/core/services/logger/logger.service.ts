import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  info(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.log(message, ...args);
    }
  }

  error(error: Error | string, ...args: any[]): void {
    console.error(error, ...args);
  }

  warn(message: string, ...args: any[]): void {
    console.warn(message, ...args);
  }

  debug(message: string, ...args: any[]): void {
    if (!environment.production) {
      console.debug(message, ...args);
    }
  }
}
