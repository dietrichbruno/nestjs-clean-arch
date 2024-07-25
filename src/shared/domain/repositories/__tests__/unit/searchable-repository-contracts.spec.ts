import {
  SearchParams,
  SearchResult,
} from '../../searchable-repository-contracts';

describe('SearchableRepositoryContracts Unit Tests', () => {
  describe('SearchParams tests', () => {
    it('page prop', () => {
      const searchParams = new SearchParams();
      expect(searchParams.page).toBe(1);

      const params = [
        { page: null as any, expected: 1 },
        { page: undefined as any, expected: 1 },
        { page: '' as any, expected: 1 },
        { page: 'test' as any, expected: 1 },
        { page: 0, expected: 1 },
        { page: -1, expected: 1 },
        { page: 2.2, expected: 1 },
        { page: {}, expected: 1 },
        { page: 1, expected: 1 },
        { page: 2, expected: 2 },
      ];

      params.forEach(i => {
        console.log(i);
        expect(new SearchParams({ page: i.page }).page).toEqual(i.expected);
      });
    });

    it('perPage prop', () => {
      const searchParams = new SearchParams();
      expect(searchParams.perPage).toBe(15);

      const params = [
        { perPage: null as any, expected: 15 },
        { perPage: undefined as any, expected: 15 },
        { perPage: '' as any, expected: 15 },
        { perPage: 'test' as any, expected: 15 },
        { perPage: 0, expected: 15 },
        { perPage: -1, expected: 15 },
        { perPage: 2.2, expected: 15 },
        { perPage: {}, expected: 15 },
        { perPage: 1, expected: 1 },
        { perPage: 25, expected: 25 },
      ];

      params.forEach(i => {
        console.log(i);
        expect(new SearchParams({ perPage: i.perPage }).perPage).toEqual(
          i.expected,
        );
      });
    });

    it('sort prop', () => {
      const sut = new SearchParams();
      expect(sut.sort).toBeNull();

      const params = [
        { sort: null as any, expected: null },
        { sort: undefined as any, expected: null },
        { sort: '' as any, expected: null },
        { sort: 'test', expected: 'test' },
        { sort: 0, expected: '0' },
        { sort: -1, expected: '-1' },
        { sort: 2.2, expected: '2.2' },
        { sort: {}, expected: '[object Object]' },
        { sort: 1, expected: '1' },
        { sort: 25, expected: '25' },
      ];

      params.forEach(i => {
        console.log(i);
        expect(new SearchParams({ sort: i.sort }).sort).toBe(i.expected);
      });
    });

    it('sortDir prop', () => {
      let sut = new SearchParams();
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: null });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: undefined });
      expect(sut.sortDir).toBeNull();

      sut = new SearchParams({ sort: '' });
      expect(sut.sortDir).toBeNull();

      const params = [
        { sortDir: null, expected: 'desc' },
        { sortDir: undefined as any, expected: 'desc' },
        { sortDir: '' as any, expected: 'desc' },
        { sortDir: 'test', expected: 'desc' },
        { sortDir: 0, expected: 'desc' },
        { sortDir: -1, expected: 'desc' },
        { sortDir: {}, expected: 'desc' },
        { sortDir: 'asc', expected: 'asc' },
        { sortDir: 'desc', expected: 'desc' },
        { sortDir: 'ASC', expected: 'asc' },
        { sortDir: 'DESC', expected: 'desc' },
        { sortDir: 'aSc', expected: 'asc' },
        { sortDir: 'dEsC', expected: 'desc' },
      ];

      params.forEach(i => {
        expect(
          new SearchParams({ sort: 'field', sortDir: i.sortDir }).sortDir,
        ).toBe(i.expected);
      });
    });

    it('filter prop', () => {
      const sut = new SearchParams();
      expect(sut.filter).toBeNull();

      const params = [
        { filter: null as any, expected: null },
        { filter: undefined as any, expected: null },
        { filter: '' as any, expected: null },
        { filter: 'test', expected: 'test' },
        { filter: 0, expected: '0' },
        { filter: -1, expected: '-1' },
        { filter: 2.2, expected: '2.2' },
        { filter: {}, expected: '[object Object]' },
        { filter: 1, expected: '1' },
        { filter: 25, expected: '25' },
      ];

      params.forEach(i => {
        expect(new SearchParams({ filter: i.filter }).filter).toBe(i.expected);
      });
    });
  });

  describe('SearchResult tests', () => {
    it('constuctor props', () => {
      const searchResult = new SearchResult({
        items: ['item1', 'item2', 'item3', 'item4'] as any,
        total: 4,
        currentPage: 1,
        perPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      });

      expect(searchResult.toJSON()).toStrictEqual({
        items: ['item1', 'item2', 'item3', 'item4'],
        total: 4,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
        sort: null,
        sortDir: null,
        filter: null,
      });
    });
  });
});
