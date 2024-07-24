import { Entity } from '../entities/entity';
import { RepositoryInterface } from './repository-contracts';

export type SortDirection = 'asc' | 'desc';

export type SearchProps<Filter = string> = {
  page?: number | null;
  perPage?: number | null;
  sortBy?: string | null;
  sortDir?: SortDirection | null;
  filter?: Filter | null;
};

export class SearchParams {
  protected _page: number;
  protected _perPage = 15;
  protected _sort: string;
  protected _sortDir: SortDirection;
  protected _filter: string;

  constructor(props: SearchProps = {}) {
    this.page = props.page || 1;
    this.perPage = props.perPage;
    this.sort = props.sortBy || 'id';
    this.sortDir = props.sortDir || 'asc';
    this.filter = props.filter || '';
  }

  get page(): number {
    return this._page;
  }

  get perPage(): number {
    return this._perPage;
  }

  get sort(): string {
    return this._sort;
  }

  get sortDir(): SortDirection {
    return this._sortDir;
  }

  get filter(): string {
    return this._filter;
  }

  private set page(value: number) {
    let _page = +value;
    if (Number.isNaN(_page) || _page <= 0 || parseInt(_page as any) !== _page) {
      _page = 1;
    }

    this._page = _page;
  }

  set perPage(value: number) {
    let _perPage = value === (true as any) ? this._perPage : +value;

    if (_perPage <= 0 || !Number.isInteger(_perPage)) {
      _perPage = this._perPage;
    }

    this._perPage = _perPage;
  }

  set sort(value: string) {
    this._sort =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }

  set sortDir(value: SortDirection) {
    if (!this.sort) {
      this._sortDir = null;
      return;
    }

    const dir = `${value}`.toLowerCase() as SortDirection;
    this._sortDir = dir !== 'asc' && dir !== 'desc' ? 'desc' : dir;
  }

  set filter(value: string) {
    this._filter =
      value === null || value === undefined || value === '' ? null : `${value}`;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}
