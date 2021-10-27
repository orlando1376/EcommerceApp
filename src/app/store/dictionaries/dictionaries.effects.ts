import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of, zip } from 'rxjs';
import * as fromActions from './dictionaries.actions';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from '@src/environments/environment';
import { Dictionaries, Dictionary, Item, ControlItem } from './dictionaries.models';

type Action = fromActions.All;

interface ModelItem {
  id: string;
  nombre: string;
}

const modelToItem = (x: ModelItem): Item => {
  return {
    id: x.id,
    name: x.nombre
  };
};

const itemControlItem = (x: Item): ControlItem => ({
  value: x.id,
  label: x.name,
  icon: x.icon
});

const addDictionary = (items: Item[]): Dictionary => ({
  items,
  controlItems: [...items].map((x) => itemControlItem(x))
});

@Injectable()
export class DictionariesEffects {

  constructor(
    private httpClient: HttpClient,
    private actions: Actions
  ){}

  read: Observable<Action> = createEffect(() =>
    this.actions.pipe(
      ofType(fromActions.Types.READ),
      switchMap(() => {
        return zip(
          // aqui van todos los llamados de maestros que seran almacenados en el estore global
          this.httpClient.get<ModelItem[]>(`${environment.url}/api/categoria`)
          .pipe(
            map((items) => items.map((x) => modelToItem(x)))
          ),
          this.httpClient.get<ModelItem[]>(`${environment.url}/api/marca`)
          .pipe(
            map((items) => items.map((x) => modelToItem(x)))
          )
        ).pipe(
          map(([categories, marca]) => {
            const dictionaries: Dictionaries = {
              categorias: addDictionary(categories),
              marca: addDictionary(marca)
            };
            return new fromActions.ReadSuccess(dictionaries);
          }),
          catchError(err => of(new fromActions.ReadError(err.message)))
        );
      })
    )
  );
}
