export * from './eventController.service';
import { EventControllerService } from './eventController.service';
export * from './pingController.service';
import { PingControllerService } from './pingController.service';
export * from './userController.service';
import { UserControllerService } from './userController.service';
export const APIS = [EventControllerService, PingControllerService, UserControllerService];
