import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationHttpService } from '../../services/notification-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CreateNotificationRequest,
  Notification,
  UpdateNotificationRequest,
} from '../../interfaces/notification.interface';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notification-form',
  standalone: false,
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.scss',
})
export class NotificationFormComponent implements OnInit {
  notificationForm!: FormGroup;
  notificationId!: number;
  icon: string = '';
  icons = [
    'school',
    'book',
    'notification_important',
    'notifications',
    'mail',
    'settings',
  ];
  private _snackBar = inject(MatSnackBar);

  get isEditMode(): boolean {
    this.notificationId = this._activatedRoute.snapshot.params['id'];
    return this.notificationId ? true : false;
  }

  get title(): string {
    return this.isEditMode ? 'Edit Notification' : 'New Notification';
  }
  constructor(
    private _fb: FormBuilder,
    private _notificationService: NotificationHttpService,
    private _destroyRef: DestroyRef,
    private _activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.initForm();
    this.getEditValues();
  }
  /**
   * @description method to initalize the form
   * @returns void
   */
  initForm(): void {
    this.notificationForm = this._fb.group({
      icon: ['', Validators.required],
      message: ['', [Validators.required, Validators.maxLength(255)]],
      metadata: ['', Validators.required],
    });
  }

  getEditValues() {
    if (!this.isEditMode) return;
    this._notificationService
      .getNotificationById(this.notificationId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (notificationData: Notification) => {
          this.populateForm(notificationData);
        },
        error: (err: Error) => {},
      });
  }
  /**
   * @description method to handle populating the form with previous values
   * @param {Notification} notificationData
   * @returns void
   */
  populateForm(notificationData: Notification): void {
    this.icon = notificationData.icon

    this.notificationForm.setValue({
      icon: notificationData.icon,
      message: notificationData.message,
      metadata: notificationData.metadata,
    });
  }
  /**
   * @description method to submit form
   * @returns void
   */

  onSubmit(): void {
    if (this.isEditMode) {
      this.editNotifictaion();
    } else {
      this.createNotification();
    }
  }

  /**
   * @description method to handle building request and create new notification
   * @returns void
   */
  createNotification(): void {
    const { icon, message, metadata } = this.notificationForm.value;
    const request: CreateNotificationRequest = {
      icon: icon,
      message: message,
      metadata: metadata,
      createdAt: new Date().toString(),
    };
    this._notificationService
      .addNotification(request)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (notificationData: Notification) => {
          this._snackBar.open('Notification Created Successfully!', '', {
            duration: 3000,
          });
        },
        error: (err: Error) => {},
      });
  }

  editNotifictaion(): void {
    const { icon, message, metadata } = this.notificationForm.value;
    const request: UpdateNotificationRequest = {
      icon: icon,
      message: message,
      metadata: metadata,
      updatedAt: new Date().toString(),
    };
    this._notificationService
      .updateNotification(request, this.notificationId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (notificationData: Notification) => {
          this._snackBar.open('Notification Updated Successfully!', '', {
            duration: 3000,
          });
        },
        error: (err: Error) => {},
      });
  }
}
