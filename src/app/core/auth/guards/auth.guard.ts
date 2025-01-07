import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map((user) => {
        if (!user) {
          this.router.navigate(['/auth/login']);
          return false;
        }

        const requiredRole = route.data['role'];
        if (requiredRole && user.role !== requiredRole) {
          this.router.navigate(['/']);
          return false;
        }

        return true;
      })
    );
  }
}
