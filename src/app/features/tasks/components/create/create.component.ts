import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskService } from '../../../../shared/services/task.service';
import { Task } from '../../../../shared/interfaces/task';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  createDialog = inject(MatDialog);
  taskService = inject(TaskService);
  creationForm!: FormGroup;
  task!:Task;;

  ngOnInit() {
    this.creationForm = new FormGroup(
      {
        name: new FormControl(this.task?.name ?? '', {
          nonNullable: true,
          validators: Validators.required
        }),
        description: new FormControl(this.task.description ?? '', {
          nonNullable: false,
          validators: Validators.maxLength(250)
        }),
        term: new FormControl(this.task.term, {
          nonNullable: true,
          validators: Validators.required
        })
      }
    )
  };

  create() {
    this.createDialog.open(CreateComponent);
  }

}
