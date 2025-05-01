import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateNotificationRequest, Notification, UpdateNotificationRequest } from '../interfaces/notification.interface';
const NOTIFICATIONS_API_URL = 'http://localhost:3000/notifications';
@Injectable({
  providedIn: 'root',
})
export class NotificationHttpService {
  constructor(private _http: HttpClient) {}
  getNotifications(): Observable<Notification[]> {
    return this._http.get<Notification[]>(NOTIFICATIONS_API_URL);
  }
  getNotificationById(id: number): Observable<Notification> {
    return this._http.get<Notification>(`${NOTIFICATIONS_API_URL}/${id}`);
  }
  addNotification(notification: CreateNotificationRequest): Observable<any> {
    return this._http.post<any>(
      `${NOTIFICATIONS_API_URL}`,
      notification
    );
  }
  updateNotification(notification: UpdateNotificationRequest,id:number): Observable<any> {
    return this._http.patch<any>(
      `${NOTIFICATIONS_API_URL}/${id}`,
      notification
    );
  }
  deleteNotification(id:number): Observable<Notification> {
    return this._http.delete<Notification>(`${NOTIFICATIONS_API_URL}/${id}`);
  }
}
