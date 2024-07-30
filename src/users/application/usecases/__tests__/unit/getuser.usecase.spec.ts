import { UserInMemoryRepository } from '@/users/infrastructure/database/repositories/user-in-memory.repository';
import { GetUserUseCase } from '../../getuser.usecase';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';

describe('GetUserUseCase unit tests', () => {
  let sut: GetUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new GetUserUseCase.UseCase(repository);
  });

  it('Should throw error when entity not found', async () => {
    await expect(() => sut.execute({ id: '1' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should be able to get user profile', async () => {
    const spyFindById = jest.spyOn(repository, 'findById');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;
    const result = await sut.execute({ id: items[0].id });

    expect(result).toMatchObject(items[0].toJSON());
    expect(spyFindById).toHaveBeenCalledTimes(1);
  });
});
