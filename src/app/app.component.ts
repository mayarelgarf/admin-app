import {
  Component,
  DestroyRef,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavLink } from './interfaces/nav.interface';
import { MainAppPaths } from './enums/MainAppPaths.enum';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  navLinks: NavLink[] = [
    { title: 'Home', link: MainAppPaths.HOME, icon: 'home' },
    { title: 'person', link:  MainAppPaths.PROFILE, icon: 'person' },
    {
      title: 'Notifications',
      link: MainAppPaths.NOTIFICATION,
      icon: 'notifications',
    },
  ];

  protected readonly isMobile = signal(true);
  private _destroyRef = inject(DestroyRef);

  private _breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.handleSideNavChanges();
  }
  /**
   * @description method to set is Mobile to true accroding to breakpoint
   * @returns void
   */
  handleSideNavChanges(): void {
    this._breakpointObserver
      .observe(['(max-width: 600px)'])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }
}
