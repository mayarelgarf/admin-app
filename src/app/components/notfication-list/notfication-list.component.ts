import { Component, DestroyRef, OnInit } from '@angular/core';
import { NotificationHttpService } from '../../services/notification-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Notification } from '../../interfaces/notification.interface';
@Component({
  selector: 'app-notfication-list',
  standalone: false,
  templateUrl: './notfication-list.component.html',
  styleUrl: './notfication-list.component.scss',
})
export class NotficationListComponent implements OnInit {
  constructor(
    private _notificationService: NotificationHttpService,
    private _destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this.getNotificationsList();
  }
  /**
   * @description method to get notification list
   * @returns void
   */
  getNotificationsList(): void {
    this._notificationService
      .getNotifications()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (notificationData: Notification[]) => {
          console.log(notificationData);
        },
        error: (err: Error) => {
          console.error(err);
        },
      });
  }
  /**
   * @description method to delete notification
   * @param {string} id
   * @returns void
   */
  // onDelete(id: string): void {
  //   this._notificationService
  //     .deleteNotification(+id)
  //     .pipe(takeUntilDestroyed(this._destroyRef))
  //     .subscribe({
  //       next:(response:any)=>{

  //       },
  //       error(err:)=>{

  //       }
  //     });
  // }
}
