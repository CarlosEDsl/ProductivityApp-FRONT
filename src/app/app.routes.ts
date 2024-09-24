import { Routes } from '@angular/router';
import { TaskPageComponent } from './features/tasks/task-page/task-page.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegisterComponent } from './features/authentication/register/register.component';
import { getTasksResolver } from './shared/resolvers/get-tasks.resolver';
import { StatisticPageComponent } from './features/statistics/statistic-page/statistic-page.component';
import { PomodoroComponent } from './features/pomodoro/pomodoro.component';
import { HomeComponent } from './shared/home/home.component';
import { AuthGuard } from './shared/auth-guard/auth-guard.guard';
import { LoadingGuard } from './shared/load-guard/load.guard';

export const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    canActivate: [LoadingGuard]
  },
  {
    path: 'my-tasks',
    resolve: {
      tasks: getTasksResolver
    },
    canActivate: [AuthGuard, LoadingGuard],
    component:TaskPageComponent
  },
  {
    path: 'login',
    component:LoginComponent,
    canActivate: [LoadingGuard]
  },
  {
    path: 'create-account',
    component:RegisterComponent,
    canActivate: [LoadingGuard]
  },
  {
    path: 'statistics',
    canActivate: [AuthGuard, LoadingGuard],
    component:StatisticPageComponent
  },
  {
    path:'pomodoro',
    canActivate: [AuthGuard, LoadingGuard],
    component:PomodoroComponent
  }
];
