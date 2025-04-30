import { Component, DestroyRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationHttpService } from '../../services/notification-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CreateNotificationRequest,
  Notification,
} from '../../interfaces/notification.interface';

@Component({
  selector: 'app-notification-form',
  standalone: false,
  templateUrl: './notification-form.component.html',
  styleUrl: './notification-form.component.scss',
})
export class NotificationFormComponent implements OnInit {
  notificationForm!: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _notificationService: NotificationHttpService,
    private _destroyRef: DestroyRef
  ) {}
  ngOnInit(): void {
    this.initForm();
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

  /**
   * @description method to submit form
   * @returns void
   */

  onSubmit(): void {
    if (this.notificationForm.valid) {
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
          console.log('created', notificationData);
        },
        error: (err: Error) => {
          console.error(err);
        },
      });
  }
}
