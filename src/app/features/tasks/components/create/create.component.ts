import { Component, inject, ChangeDetectionStrategy, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../../../shared/services/task.service';
import { Task } from '../../../../shared/interfaces/task';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { TokenServiceService } from '../../../../shared/services/token-service.service';


@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule,
    MatCardModule, CommonModule, FormsModule, ReactiveFormsModule, MatDatepickerModule,
    MatInputModule, MatFormFieldModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  createDialog = inject(MatDialog);
  taskService = inject(TaskService);
  authService = inject(TokenServiceService);
  creationForm!: FormGroup;
  task?:Task;

  isEditingName: boolean = false;
  isEditingDescription: boolean = false;
  isEditingTerm: boolean = false;

  @ViewChild('nameInput') nameInput!: ElementRef;



  ngOnInit() {
    this.creationForm = new FormGroup({
      name: new FormControl(this.task?.name ?? '', {
        nonNullable: true,
        validators: Validators.required
      }),
      description: new FormControl(this.task?.description ?? '', {
        validators: Validators.maxLength(250)
      }),
      term: new FormControl(this.task?.term ?? '', {
        nonNullable: true,
        validators: Validators.required

      })
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
      const newTask: Task = {
        user_id: parseInt(this.authService.getId() || '0'),
        name: taskForm.name,
        description: taskForm.description,
        term: new Date(taskForm.term).toISOString(),
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
    this.createDialog.open(CreateComponent);
  }

}

