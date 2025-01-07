import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastService } from '../toast/toast.service';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(
    private toastService: ToastService,
    private loggerService: LoggerService
  ) {}

  handleError(error: Error | HttpErrorResponse): void {
    if (error instanceof HttpErrorResponse) {
      this.handleHttpError(error);
    } else {
      this.handleGenericError(error);
    }
  }

  private handleHttpError(error: HttpErrorResponse): void {
    let message = 'An error occurred';

    if (error.status === 404) {
      message = 'Resource not found';
    } else if (error.status === 403) {
      message = 'You do not have permission to perform this action';
    } else if (error.status === 401) {
      message = 'Please login to continue';
    } else if (error.status >= 500) {
      message = 'Server error occurred';
    }

    this.toastService.showError(message);
    this.loggerService.error(error);
  }

  private handleGenericError(error: Error): void {
    this.toastService.showError(error.message);
    this.loggerService.error(error);
  }
}
