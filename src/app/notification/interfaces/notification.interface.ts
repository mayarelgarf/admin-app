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

export interface CreateNotificationRequest{
  icon: string;
  message: string;
  metadata: string;
  createdAt: string;

}
