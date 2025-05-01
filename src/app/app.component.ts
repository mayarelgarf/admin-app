import {
  Component,
  inject,
  signal,
  ViewChild,
} from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { NavLink } from './interfaces/nav.interface';
import { MainAppPaths } from './enums/MainAppPaths.enum';
import { Subscription } from 'rxjs';

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
    { title: 'Home', link: `${MainAppPaths.HOME}`, icon: 'home' },
    { title: 'person', link: '', icon: 'person' },
    {
      title: 'Notifications',
      link: `${MainAppPaths.NOTIFICATION}`,
      icon: 'notifications',
    },
  ];

  protected readonly isMobile = signal(true);


  private breakpointSub: Subscription;
  private breakpointObserver = inject(BreakpointObserver);

  constructor() {
    this.breakpointSub = this.breakpointObserver
      .observe(['(max-width: 600px)'])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  ngOnDestroy(): void {
    this.breakpointSub.unsubscribe();
  }
}
