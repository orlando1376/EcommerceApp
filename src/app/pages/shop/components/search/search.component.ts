import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import * as fromRoot from '@app/store';
import * as fromList from '../../store/list';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  form!: FormGroup;
  paginatorParams!: HttpParams;
  private destroy = new Subject<any>();

  constructor(
    private fb: FormBuilder,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    // obtener los datos
    this.store.pipe(takeUntil(this.destroy)).pipe(select(fromList.getPaginationRequest))
      .subscribe((data: any) => {
        this.paginatorParams = data;
      });

    // crear los controles
    this.form = this.fb.group({
      search: [null, {
        updateOn: 'change', validators: []
      }]
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(null);
    this.destroy.complete();
  }

  public onSubmit(): void {
    const value = this.form.value;

    // borrar los datos anteriores
    this.paginatorParams = this.paginatorParams.delete('search');
    this.paginatorParams = this.paginatorParams.delete('pageIndex');

    // agregar los nuevo valores
    this.paginatorParams = this.paginatorParams.set('pageIndex', 1);
    if (value.search !== null && value.search.trim() !== '') {
      this.paginatorParams = this.paginatorParams.set('search', value.search.trim());
    }

    // traer los datos desde el servidor
    this.store.dispatch(new fromList.Read(this.paginatorParams, this.paginatorParams.toString()));
  }

}
