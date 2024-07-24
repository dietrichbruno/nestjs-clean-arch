import { SearchParams } from '../../searchable-repository-contracts';

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
  });
});
