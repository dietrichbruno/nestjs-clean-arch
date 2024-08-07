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

  it('Should return the users ordered by createdAt', async () => {
    const createdAt = new Date();
    const items = [
      new UserEntity(UserDataBuilder({ createdAt })),
      new UserEntity(
        UserDataBuilder({ createdAt: new Date(createdAt.getTime() + 1) }),
      ),
    ];

    repository.items = items;

    const output = await sut.execute({});

    expect(output).toEqual(
      expect.objectContaining({
        items: [...items].reverse().map(entity => entity.toJSON()),
        total: 2,
        currentPage: 1,
        perPage: 15,
        lastPage: 1,
      }),
    );
  });

  it('Should return the users using paginate sort and filter', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'a' })),
      new UserEntity(UserDataBuilder({ name: 'AA' })),
      new UserEntity(UserDataBuilder({ name: 'Aa' })),
      new UserEntity(UserDataBuilder({ name: 'c' })),
      new UserEntity(UserDataBuilder({ name: 'c' })),
    ];

    repository.items = items;

    let output = await sut.execute({
      page: 1,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    });

    expect(output).toEqual(
      expect.objectContaining({
        items: [items[1].toJSON(), items[2].toJSON()],
        total: 3,
        currentPage: 1,
        perPage: 2,
        lastPage: 2,
      }),
    );

    output = await sut.execute({
      page: 2,
      perPage: 2,
      sort: 'name',
      sortDir: 'asc',
      filter: 'a',
    });

    expect(output).toEqual(
      expect.objectContaining({
        items: [items[0].toJSON()],
        total: 3,
        currentPage: 2,
        perPage: 2,
        lastPage: 2,
      }),
    );

    output = await sut.execute({
      page: 1,
      perPage: 3,
      sort: 'name',
      sortDir: 'desc',
      filter: 'a',
    });

    expect(output).toEqual(
      expect.objectContaining({
        items: [items[0].toJSON(), items[2].toJSON(), items[1].toJSON()],
        total: 3,
        currentPage: 1,
        perPage: 3,
        lastPage: 1,
      }),
    );
  });
});
