import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NotificationHttpService } from '../../services/notification-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Notification } from '../../interfaces/notification.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NotificationPaths } from '../../enums/NotificationPaths.enum';
import { MainAppPaths } from '../../../enums/MainAppPaths.enum';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notfication-list',
  standalone: false,
  templateUrl: './notfication-list.component.html',
  styleUrl: './notfication-list.component.scss',
})
export class NotficationListComponent implements OnInit {
  private _snackBar = inject(MatSnackBar);
  displayedColumns: string[] = [
    'icon',
    'message',
    'metadata',
    'link',
    'createdAt',
    'updatedAt',
    'star',
  ];
  dataSource!: MatTableDataSource<Notification>;
  selectedNotification!: Notification;

  constructor(
    private _notificationService: NotificationHttpService,
    private _destroyRef: DestroyRef,
    private _router: Router
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

          this.dataSource = new MatTableDataSource<Notification>(
            notificationData
          );

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
          this._snackBar.open('Notification Deleted Successfully!', '', {
            duration: 3000,
          });
          this.getNotificationsList()
        },
        error: (err: Error) => {
          console.error(err);
        },
      });
  }
  /**
   * @description method to navigate to edit page
   * @param {number} id
   * @returns void
   */
  editNotification(id: number): void {
    this._router.navigate([
      `${MainAppPaths.NOTIFICATION}/${NotificationPaths.EDIT}/${id}`,
    ]);
  }
}
