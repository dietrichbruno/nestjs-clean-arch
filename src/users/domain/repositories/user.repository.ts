import { UserEntity } from '../entities/user.entity';
import { SearchableRepositoryInterface } from '@/shared/domain/repositories/searchable-repository-contracts';
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from '@/shared/domain/repositories/searchable-repository-contracts';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UserRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<UserEntity, Filter> {}
  export interface Repository
    extends SearchableRepositoryInterface<
      UserEntity,
      Filter,
      SearchParams,
      SearchResult
    > {
    findByEmail(email: string): Promise<UserEntity>;
    emailExists(email: string): Promise<void>;
  }
}
