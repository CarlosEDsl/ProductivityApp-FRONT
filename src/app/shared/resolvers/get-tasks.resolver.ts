import { TokenServiceService } from './../services/token-service.service';
import { inject } from "@angular/core"
import { TaskService } from '../services/task.service';

export const getTasksResolver = () => {
  const tokenService = inject(TokenServiceService);
  const http = inject(TaskService);

  const userId = tokenService.getId();
  const token = tokenService.getToken();

  if(token && userId)
    return http.getAllFromUser(userId, token);
  else
    throw new Error("Not full information");
};
