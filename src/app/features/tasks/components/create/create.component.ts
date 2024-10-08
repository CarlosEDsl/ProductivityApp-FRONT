import { LoadingService } from './../../../../shared/services/loading.service';
import { Component, inject, ChangeDetectionStrategy, ElementRef, ViewChild, Renderer2, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
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
  templateUrl: './create.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './create.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class CreateComponent {
  createDialog = inject(MatDialog);
  taskService = inject(TaskService);
  authService = inject(TokenServiceService);
  responseBar = inject(SnackbarService);
  creationForm!: FormGroup;
  task?:Task;
  private _bottomSheet = inject(MatBottomSheet);

  isEditingName: boolean = false;
  isEditingDescription: boolean = false;
  isEditingTerm: boolean = false;

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild(MatDatepicker) datePicker!: MatDatepicker<any>;
  @ViewChild(NgxMaterialTimepickerComponent) timePicker!: NgxMaterialTimepickerComponent;

  constructor(private renderer:Renderer2, private loadingService:LoadingService) {}



  ngOnInit() {
    this.creationForm = new FormGroup({
      name: new FormControl(this.task?.name ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      description: new FormControl(this.task?.description ?? '', {
        validators: Validators.maxLength(250)
      }),
      termDate: new FormControl(this.task?.term ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      termTime: new FormControl('', {
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
    if (this.creationForm.valid) {
      const taskForm = this.creationForm.value;

      const termDate = new Date(taskForm.termDate);

      const {hour, minute} = this.hours24Converter(taskForm.termTime);
      termDate.setHours(hour, minute)

      const newTask: Task = {
        user_id: parseInt(this.authService.getId() || '0'),
        name: taskForm.name,
        description: taskForm.description,
        term: termDate.toISOString(),
        inputDate: new Date().toISOString(),
        finishDate: taskForm.finishDate ? new Date(taskForm.finishDate).toISOString() : undefined
      };

      if (newTask.user_id === 0) {
        throw new Error("Id not found");
      }
      if(new Date(newTask.term.toString()).getTime() > Date.now() && newTask.description?.length || 0 <= 250){
        this.loadingService.show();
        this.taskService.create(newTask, this.authService.getToken() || '').subscribe({
          next: (response) => {
            this.loadingService.hide();
            this.responseBar.show("Task successful created", 'success');
            this.createDialog.closeAll();
          },
          error: (error) => {
            this.loadingService.hide();
            this.responseBar.show("Error in task creation", 'error');
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

  create() {
    this.createDialog.open(CreateComponent).addPanelClass("downDialog");
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

