import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationHttpService } from '../../services/notification-http.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  CreateNotificationRequest,
  Notification,
  UpdateNotificationRequest,
} from '../../interfaces/notification.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { IconsService } from '../../../shared/services/icons.service';
import { AppIcon } from '../../../shared/interfaces/icons.interface';
import { MainAppPaths } from '../../../enums/MainAppPaths.enum';

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
  selectedColor!: string;
  private _snackBar = inject(MatSnackBar);

  get isEditMode(): boolean {
    this.notificationId = this._activatedRoute.snapshot.params['id'];
    return this.notificationId ? true : false;
  }
  get icons(): AppIcon[] {
    return this._iconsService.appIcons;
  }
  get title(): string {
    return this.isEditMode ? 'Edit Notification' : 'New Notification';
  }
  get linkUrl(): SafeResourceUrl {
    let link = this.notificationForm.get('link')?.value;
    if (link) {
      const safeUrl = this._santizier.bypassSecurityTrustResourceUrl(link);
      return safeUrl;
    } else {
      return '';
    }
  }
  constructor(
    private _fb: FormBuilder,
    private _notificationService: NotificationHttpService,
    private _destroyRef: DestroyRef,
    private _activatedRoute: ActivatedRoute,
    private _santizier: DomSanitizer,
    private _iconsService: IconsService,
    private _router: Router
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
      link: [''],
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
    this.icon = notificationData.icon;
    this.selectedColor = notificationData?.color || '';
    this.notificationForm.setValue({
      icon: notificationData.icon,
      message: notificationData.message,
      metadata: notificationData.metadata,
      link: notificationData?.link,
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
    const { icon, message, metadata, link } = this.notificationForm.value;
    const request: CreateNotificationRequest = {
      icon: icon,
      message: message,
      metadata: metadata,
      link: link,
      createdAt: new Date().toString(),
      color: this.selectedColor,
    };
    this._notificationService
      .addNotification(request)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (notificationData: Notification) => {
          this._snackBar.open('Notification Created Successfully!', '', {
            duration: 1000,
          }).afterDismissed().pipe(takeUntilDestroyed(this._destroyRef)).subscribe((info)=>{
            this._router.navigate([MainAppPaths.NOTIFICATION])
          })

        },
        error: (err: Error) => {},
      });
  }
  /**
   * @description method to handle building request and edit existing notification
   * @returns void
   */
  editNotifictaion(): void {
    const { icon, message, metadata, link } = this.notificationForm.value;
    const request: UpdateNotificationRequest = {
      icon: icon,
      message: message,
      metadata: metadata,
      link: link,
      updatedAt: new Date().toString(),
      color: this.selectedColor,
    };
    this._notificationService
      .updateNotification(request, this.notificationId)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe({
        next: (notificationData: Notification) => {
          this._snackBar.open('Notification Updated Successfully!', '', {
            duration: 1000,
          }).afterDismissed().pipe(takeUntilDestroyed(this._destroyRef)).subscribe((info)=>{
            this._router.navigate([MainAppPaths.NOTIFICATION])
          })
        },
        error: (err: Error) => {},
      });
  }
}
