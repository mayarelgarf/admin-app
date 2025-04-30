import { Component, DestroyRef, OnInit, ViewChild } from '@angular/core';
import { NotificationHttpService } from '../../services/notification-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Notification } from '../../interfaces/notification.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-notfication-list',
  standalone: false,
  templateUrl: './notfication-list.component.html',
  styleUrl: './notfication-list.component.scss',
})
export class NotficationListComponent implements OnInit {
  displayedColumns: string[] = [
    'message',
    'metadata',
    'createdAt',
    'updatedAt',
    'star',
  ];
  dataSource!: MatTableDataSource<Notification>;
  selectedNotification!: Notification;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

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
          this.dataSource = new MatTableDataSource<Notification>(
            notificationData
          );
          this.paginator.length = notificationData.length;
        },
        error: (err: Error) => {
          console.error(err);
        },
      });
  }
  /**
   * @description method to apply filter
   * @param {Event} event
   * @returns void
   */
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * @description method to delete notification
   * @param {number} id
   * @returns void
   */
  onDelete(id: number): void {
    this._notificationService
      .deleteNotification(id)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (notificationData: Notification) => {
          console.log(notificationData);
        },
        error: (err: Error) => {
          console.error(err);
        },
      });
  }
}
