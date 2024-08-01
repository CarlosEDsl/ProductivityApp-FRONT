import { Injectable, NgModule, NgZone } from '@angular/core';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

const matSnackbarDefaultConfig: MatSnackBarConfig = {
  verticalPosition: 'top',
  horizontalPosition: 'right',
  duration: 4000,
};

// Just add the new required types here and TypeScript will require the public consumer to pass a valid type
export type SnackBarType = 'error' | 'success' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {

  private config: MatSnackBarConfig = {
    verticalPosition: 'bottom',
    horizontalPosition: 'center',
    duration: 3000,
  };

  constructor(private snackbar: MatSnackBar, private zone: NgZone) { }

  show(message: string, type: SnackBarType): void {
    this.zone.run(() => {
      this.snackbar.open(
        message,
        'Ok',
        {...this.config}
      );
      const snackbarEl = document.querySelectorAll(".mdc-snackbar__surface");
      snackbarEl.forEach(element => {
        (element as HTMLElement).classList.add(type);
      });
    });
  }
}
