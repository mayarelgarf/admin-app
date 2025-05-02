export interface Notification {
  id: number;
  icon: string;
  message: string;
  metadata: string;
  link?: string;
  color?: string;
  createdAt: string;
  updatedAt?: string;
}
export interface NotificationRequest {
  icon: string;
  message: string;
  metadata: string;
  link:string
  color?:string
}
export interface CreateNotificationRequest extends NotificationRequest {
  createdAt: string;
}

export interface UpdateNotificationRequest extends NotificationRequest {
  updatedAt: string;
}
