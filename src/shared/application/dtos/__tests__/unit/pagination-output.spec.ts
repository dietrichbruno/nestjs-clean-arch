import { SearchResult } from '@/shared/domain/repositories/searchable-repository-contracts';
import { PaginationOutputMapper } from '../../pagination-output';

describe('PaginationOutputMapper unit tests', () => {
  it('Should convert a SearchResult in output', () => {
    const result = new SearchResult({
      items: ['fake'] as any,
      total: 1,
      currentPage: 1,
      perPage: 1,
      sort: '',
      sortDir: '',
      filter: '',
    });

    const sut = PaginationOutputMapper.toOutput(result.items, result);

    expect(sut).toEqual(
      expect.objectContaining({
        items: ['fake'],
        total: 1,
        currentPage: 1,
        perPage: 1,
        lastPage: 1,
      }),
    );
  });
});
