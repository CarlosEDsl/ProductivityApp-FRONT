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
  creationForm!: FormGroup;
  task?:Task;
  private _bottomSheet = inject(MatBottomSheet);

  isEditingName: boolean = false;
  isEditingDescription: boolean = false;
  isEditingTerm: boolean = false;

  @ViewChild('nameInput') nameInput!: ElementRef;
  @ViewChild(MatDatepicker) datePicker!: MatDatepicker<any>;
  @ViewChild(NgxMaterialTimepickerComponent) timePicker!: NgxMaterialTimepickerComponent;

  constructor(private renderer:Renderer2) {}



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

      const {hour, minute} = this.brazillianHoursConverter(taskForm.termTime);
      termDate.setHours(hour-3, minute, 0);

      const newTask: Task = {
        user_id: parseInt(this.authService.getId() || '0'),
        name: taskForm.name,
        description: taskForm.description,
        term: termDate.toISOString(), // Combinação de data e hora
        inputDate: new Date().toISOString(),
        finishDate: taskForm.finishDate ? new Date(taskForm.finishDate).toISOString() : undefined
      };

      if (newTask.user_id === 0) {
        throw new Error("Id not found");
      }

      console.log(newTask);
      this.taskService.create(newTask, this.authService.getToken() || '').subscribe({
        next: (response) => {
          console.log('Task created successfully', response);
          this.createDialog.closeAll();
        },
        error: (error) => {
          console.error('Error creating task', error);
        }
      });
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

  brazillianHoursConverter(time: string) {
    let hour: number=0;
    let minute: number;

    // Extraia os valores de hora e minuto
    const period = time.slice(-2); // "AM" ou "PM"
    const timeWithoutPeriod = time.slice(0, -2); // Remove "AM" ou "PM"
    const [hourString, minuteString] = timeWithoutPeriod.split(':');

    // Converta os valores para números
    const hourNumber = parseInt(hourString, 10);
    minute = parseInt(minuteString, 10);

    // Converta para o formato de 24 horas
    if (period === 'PM') {
      if (hourNumber !== 12) {
        hour = hourNumber + 12; // Adiciona 12 horas para PM, exceto para 12 PM
      } else {
        hour = 12; // 12 PM é 12:00 no formato de 24 horas
      }
    } else if (period === 'AM') {
      if (hourNumber === 12) {
        hour = 0; // 12 AM é 00:00 no formato de 24 horas
      } else {
        hour = hourNumber;
      }
    }

    return { hour, minute };
  }

}

