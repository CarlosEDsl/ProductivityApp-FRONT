import { Routes } from '@angular/router';
import { TaskPageComponent } from './features/tasks/task-page/task-page.component';

export const routes: Routes = [
  {
    path: 'my-tasks',
    component:TaskPageComponent
  }
];
