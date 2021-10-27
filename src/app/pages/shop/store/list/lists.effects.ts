import { Pagination } from './list.models';
import * as fromActions from './list.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap, take } from 'rxjs/operators';
import { environment } from '@src/environments/environment';

type Action = fromActions.All;

@Injectable()
export class ListEffects {

  constructor(
    private actions: Actions,
    private httpClient: HttpClient
  ){}

  // lee los datos desde el servidor remoto
  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      map((action: fromActions.Read) => action.paramsUrl),
      // toma action.paramsUrl y lo convierte a un string llamado request
      switchMap((request: string) =>
        this.httpClient.get<Pagination>(`${environment.url}/api/Producto?${request}`)
        .pipe(
          // delay(1000), // para poder ver el loading
          map((pagination: any) => new fromActions.ReadSuccess(pagination)),
          catchError(err => of(new fromActions.ReadError(err.message)))
        )
      )
    )
  );
}
