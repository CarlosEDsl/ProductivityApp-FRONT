import { Routes } from '@angular/router';
import { TaskPageComponent } from './features/tasks/task-page/task-page.component';
import { LoginComponent } from './features/authentication/login/login.component';

export const routes: Routes = [
  {
    path: 'my-tasks',
    component:TaskPageComponent
  },
  {
    path: 'login',
    component:LoginComponent
  }
];
