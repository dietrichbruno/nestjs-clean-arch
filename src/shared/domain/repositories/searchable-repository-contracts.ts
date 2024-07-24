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

  constructor(props: SearchProps) {
    this._page = props.page || 1;
    this._perPage = props.perPage;
    this._sort = props.sortBy || 'id';
    this._sortDir = props.sortDir || 'asc';
    this._filter = props.filter || '';
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

  set page(page: number) {
    this._page = page;
  }

  set perPage(perPage: number) {
    this._perPage = perPage;
  }

  set sort(sort: string) {
    this._sort = sort;
  }

  set sortDir(sortDir: SortDirection) {
    this._sortDir = sortDir;
  }

  set filter(filter: string) {
    this._filter = filter;
  }
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  SearchInput,
  SearchOutput,
> extends RepositoryInterface<E> {
  search(props: SearchParams): Promise<SearchOutput>;
}
