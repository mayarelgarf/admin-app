import { Component, DestroyRef, inject, signal, ViewChild } from '@angular/core';
import { BreakpointObserver, MediaMatcher } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs/operators';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavLink } from './interfaces/nav.interface';
import { MainAppPaths } from './enums/MainAppPaths.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
navLinks:NavLink[]=[
  {title:'Home',link:`${MainAppPaths.HOME}`,icon:'home'},
  {title:'person',link:'',icon:'person'},
  {title:'Notifications',link:`${MainAppPaths.NOTIFICATION}`,icon:'notifications'},
]

protected readonly isMobile = signal(true);

private readonly _mobileQuery: MediaQueryList;
private readonly _mobileQueryListener: () => void;

constructor() {
  const media = inject(MediaMatcher);

  this._mobileQuery = media.matchMedia('(max-width: 600px)');
  this.isMobile.set(this._mobileQuery.matches);
  this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
  this._mobileQuery.addEventListener('change', this._mobileQueryListener);
}

ngOnDestroy(): void {
  this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
}
}
