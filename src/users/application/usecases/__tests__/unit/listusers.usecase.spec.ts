import { UserInMemoryRepository } from '@/users/infrastructure/database/repositories/user-in-memory.repository';
import { ListUsersUseCase } from '../../listusers.usecase';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('ListUsersUseCase unit tests', () => {
  let sut: ListUsersUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new ListUsersUseCase.UseCase(repository);
  });

  it('to output method', () => {
    let result = new UserRepository.SearchResult({
      items: [] as any,
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    let output = sut['toOutput'](result);

    expect(output).toEqual(
      expect.objectContaining({
        items: [],
        total: 1,
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
      }),
    );

    const entity = new UserEntity(UserDataBuilder({}));
    result = new UserRepository.SearchResult({
      items: [entity],
      total: 1,
      currentPage: 1,
      perPage: 2,
      sort: null,
      sortDir: null,
      filter: null,
    });

    output = sut['toOutput'](result);

    expect(output).toEqual(
      expect.objectContaining({
        items: [entity.toJSON()],
        total: 1,
        currentPage: 1,
        perPage: 2,
        lastPage: 1,
      }),
    );
  });
});
