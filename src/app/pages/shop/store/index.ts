import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromList from './list/list.reducer';
import { ListEffects } from './list/lists.effects';

export interface ShopState {
  list: fromList.ListState;
}

export const reducers: ActionReducerMap<ShopState> = {
  list: fromList.reducer
};

export const effects: any[] = [
  ListEffects // llamar a la lógica de consulta de datos al servidor
];

// crea una entrada en el store llamado shop
export const getShopState = createFeatureSelector<ShopState>('shop');
