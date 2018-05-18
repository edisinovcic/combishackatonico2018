import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AlertService {
  constructor(public snackBar: MatSnackBar) {}

  success(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 2000,
      verticalPosition: 'bottom'
    });
  }

  danger(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      verticalPosition: 'bottom'
    });
  }

}
