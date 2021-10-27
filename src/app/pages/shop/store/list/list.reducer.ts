import { Pagination } from './list.models';
import * as fromAction from './list.actions';
import { HttpParams } from '@angular/common/http';

export interface ListState {
  pagination: Pagination | null;
  requestPagination: HttpParams | null;
  loading: boolean | null;
  error: string | null;
}

export const initalState: ListState = {
  pagination: null,
  requestPagination: null,
  loading: null,
  error: null
};

export function reducer(state: ListState = initalState, action: fromAction.All | any) {
  switch (action.type) {
    case fromAction.Types.READ: {
      return {...state, loading: true, error: null, requestPagination: action.paginationRequest};
    }
    case fromAction.Types.READ_SUCCESS: {
      return {...state, loading: false, error: null, pagination: action.pagination};
    }
    case fromAction.Types.READ_ERROR: {
      return {...state, loading: false, error: action.error};
    }
    default: {
      return state;
    }
  }
}
