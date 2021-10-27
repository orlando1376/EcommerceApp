import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '@app/services';
import { Observable, of } from 'rxjs';
import * as fromActions from './user.actions';
import { switchMap, tap, catchError, map } from 'rxjs/operators';
import { UserResponse } from './user.models';
import { environment } from '@src/environments/environment';

type Action = fromActions.All;

@Injectable()
export class UserEffects {
  constructor(
    private actions: Actions,
    private router: Router,
    private httpClient: HttpClient,
    private notification: NotificationService
  ){}

  // registrar nuevo usuario
  signUpEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_UP_EMAIL),
      map((action: fromActions.SignUpEmail) => action.user),
      switchMap(userData =>
        this.httpClient.post<UserResponse>(`${environment.url}/api/Usuario/Registrar`, userData)
          .pipe(
            // si se ejecutó correctamente
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignUpEmailSuccess(response.id, response || null)),
            catchError(err => {
              this.notification.error('Error al crear usuario.');
              return of(new fromActions.SignUpEmailError(err.message));
            })
          )
      )
    )
  );

  // login
  signInEmail: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.SIGIN_IN_EMAIL),
      map((action: fromActions.SignInEmail) => action.credential),
      switchMap(credentials =>
        this.httpClient.post<UserResponse>(`${environment.url}/api/Usuario/login`, credentials)
          .pipe(
            // si se ejecutó correctamente
            tap((response: UserResponse) => {
              localStorage.setItem('token', response.token);
              this.router.navigate(['/']);
            }),
            map((response: UserResponse) => new fromActions.SignInEmailSuccess(response.id, response || null)),
            catchError(err => {
              this.notification.error('Credenciales incorrectas.');
              return of(new fromActions.SignInEmailError(err.message));
            })
          )
      )
    )
  );

  // iniciar sesion
  init: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.INIT),
      switchMap(async () => localStorage.getItem('token')),
      switchMap(token => {
        if (token) {
          return this.httpClient.get<UserResponse>(`${environment.url}/api/Usuario`)
            .pipe(
              tap((user: UserResponse) => {
                console.log('data del usuario en sesion', user);
              }),
              map((user: UserResponse) => new fromActions.InitAuthorized(user.id, user || null)),
              catchError(err => of(new fromActions.InitError(err.message)))
            );
        } else {
          return of(new fromActions.InitUnauthorized());
        }
      }
      )
    )
  );

}
