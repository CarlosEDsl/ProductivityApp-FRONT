import { Component, inject, ChangeDetectionStrategy, ElementRef, ViewChild, Renderer2, ViewEncapsulation, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../../../shared/services/task.service';
import { Task } from '../../../../shared/interfaces/task';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { TokenServiceService } from '../../../../shared/services/token-service.service';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TaskPageComponent } from '../../task-page/task-page.component';
import { SnackbarService } from '../../../../shared/snack-bar/snack-bar.service';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule,
    MatCardModule, CommonModule, FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatInputModule, MatFormFieldModule, MatBottomSheetModule, NgxMaterialTimepickerModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './edit.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './edit.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class EditComponent {
  createDialog = inject(MatDialog);
  taskService = inject(TaskService);
  authService = inject(TokenServiceService);
  responseBar = inject(SnackbarService);
  editForm!: FormGroup;
  task?:Task;
  private _bottomSheet = inject(MatBottomSheet);

  isEditingName: boolean = false;
  isEditingDescription: boolean = false;
  isEditingTerm: boolean = false;

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild(MatDatepicker) datePicker!: MatDatepicker<any>;
  @ViewChild(NgxMaterialTimepickerComponent) timePicker!: NgxMaterialTimepickerComponent;

  constructor(private renderer:Renderer2, @Inject(MAT_DIALOG_DATA) public data: Task) {}



  ngOnInit() {
    const termDate = new Date(this.data.term);

    let hours = termDate.getHours();
    let minutes = termDate.getMinutes();

    let amORpm = 'AM';
    if (hours >= 12) {
      amORpm = 'PM';
      if (hours > 12) {
        hours -= 12;
      }
    }
    if (hours === 0) {
      hours = 12;
    }

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    const formattedTime = `${formattedHours}:${formattedMinutes} ${amORpm}`;

    this.editForm = new FormGroup({
      name: new FormControl(this.task?.name ?? this.data.name, {
        nonNullable: true,
        validators: Validators.required
      }),
      description: new FormControl(this.task?.description ?? this.data.description, {
        validators: Validators.maxLength(250)
      }),
      termDate: new FormControl(this.task?.term ?? this.data.term, {
        nonNullable: true,
        validators: Validators.required
      }),
      termTime: new FormControl(formattedTime, {
        nonNullable: true,
        validators: Validators.required
      }),
    });
  }


  toggleEdit(field: string) {
    switch (field) {
      case 'name':
        this.isEditingName = !this.isEditingName;
        if (this.isEditingName) {
          setTimeout(() => this.nameInput.nativeElement.focus(), 0);
        }
        break;
    }
  }


  onSubmit() {
    if (this.editForm.valid) {
      const taskForm = this.editForm.value;

      const termDate = new Date(taskForm.termDate);

      const {hour, minute} = this.hours24Converter(taskForm.termTime);
      termDate.setUTCHours(hour, minute);

      const updatedTask: Task = {
        id: this.data.id,
        user_id: parseInt(this.authService.getId() || '0'),
        name: taskForm.name,
        description: taskForm.description,
        term: termDate.toISOString(),
        inputDate: new Date().toISOString(),
        finishDate: taskForm.finishDate ? new Date(taskForm.finishDate).toISOString() : undefined
      };

      if (updatedTask.user_id === 0) {
        throw new Error("Id not found");
      }
      if(new Date(updatedTask.term).getTime()+10800000 > Date.now()){
        this.taskService.edit(updatedTask, this.authService.getToken() || '').subscribe({
          next: (response) => {
            this.responseBar.show("Task successful edited ", 'success');
            this.createDialog.closeAll();
          },
          error: (error) => {
            this.responseBar.show("Error in task edited", 'error');
          }
        });
      } else {
        this.responseBar.show("Term can't be before now", 'error');
      }
    } else {
      this.responseBar.show("Data is missing", 'error');
    }
  }

  saveEdit(field: string) {
    this.toggleEdit(field);
  }

  removeFocus(event: FocusEvent): void {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.setSelectionRange(0, 0); // Remove a seleção de texto
  }

  hours24Converter(time: string) {
    let hour: number=0;
    let minute: number;

    const period = time.slice(-2);
    const timeWithoutPeriod = time.slice(0, -2);
    const [hourString, minuteString] = timeWithoutPeriod.split(':');

    const hourNumber = parseInt(hourString, 10);
    minute = parseInt(minuteString, 10);

    if (period === 'PM') {
      if (hourNumber !== 12) {
        hour = hourNumber + 12;
      } else {
        hour = 12;
      }
    } else if (period === 'AM') {
      if (hourNumber === 12) {
        hour = 0;
      } else {
        hour = hourNumber;
      }
    }

    return { hour, minute };
  }

}

