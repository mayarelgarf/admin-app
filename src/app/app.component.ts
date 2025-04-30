import { Component, DestroyRef, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
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
  constructor(
    private _observer: BreakpointObserver,
    private _router: Router,
    private _destroyRef: DestroyRef
  ) {}

  ngAfterViewInit() {
    this._observer
      .observe(['(max-width: 800px)'])
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((res) => {
        if (res?.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this._router.events
      .pipe(
        takeUntilDestroyed(this._destroyRef),
        filter((e) => e instanceof NavigationEnd)
      )
      .subscribe(() => {
        if (this.sidenav.mode === 'over') {
          this.sidenav.close();
        }
      });
  }
}
