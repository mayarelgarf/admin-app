import { Injectable } from '@angular/core';
import { AppIcon } from '../interfaces/icons.interface';

@Injectable({
  providedIn: 'root',
})
export class IconsService {
  get appIcons(): AppIcon[] {
    return [
      {
        label: 'School',
        iconName: 'school',
      },
      {
        label: 'Book',
        iconName: 'book',
      },
      {
        label: 'Notifications',
        iconName: 'notifications',
      },
      {
        label: 'Mail',
        iconName: 'mail',
      },
      {
        label: 'Settings',
        iconName: 'settings',
      },
    ];
  }
  constructor() {}
}
