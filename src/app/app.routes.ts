import { Routes } from '@angular/router';
import { TaskPageComponent } from './features/tasks/task-page/task-page.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { getTasksResolver } from './shared/resolvers/get-tasks.resolver';

export const routes: Routes = [
  {
    path: 'my-tasks',
    resolve: {
      tasks: getTasksResolver
    },
    component:TaskPageComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'create-account',
    component:RegisterComponent
  }
];
