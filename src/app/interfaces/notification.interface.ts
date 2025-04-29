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
