import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { USER_MANAGEMENT } from '../constants/user-management.constants';
import {
  UserTableState,
  UserTableFilters,
} from '../models/user-table.interface';

@Injectable({
  providedIn: 'root',
})
export class UserSearchService {
  private defaultState: UserTableState = {
    page: 1,
    pageSize: USER_MANAGEMENT.PAGINATION.DEFAULT_PAGE_SIZE,
    sortField: USER_MANAGEMENT.SORT.DEFAULT_SORT_FIELD,
    sortOrder: 'asc',
    filters: {},
    searchTerm: '',
  };

  private stateSubject = new BehaviorSubject<UserTableState>(this.defaultState);
  private searchTermSubject = new BehaviorSubject<string>('');

  state$ = this.stateSubject.asObservable();
  searchTerm$ = this.searchTermSubject.pipe(
    debounceTime(300),
    distinctUntilChanged()
  );

  updateState(newState: Partial<UserTableState>): void {
    this.stateSubject.next({
      ...this.stateSubject.value,
      ...newState,
    });
  }

  updateFilters(filters: Partial<UserTableFilters>): void {
    this.updateState({
      filters: {
        ...this.stateSubject.value.filters,
        ...filters,
      },
    });
  }

  updateSearchTerm(term: string): void {
    this.searchTermSubject.next(term);
    this.updateState({ searchTerm: term, page: 1 });
  }

  resetState(): void {
    this.stateSubject.next(this.defaultState);
    this.searchTermSubject.next('');
  }

  getCurrentState(): UserTableState {
    return this.stateSubject.value;
  }
}
