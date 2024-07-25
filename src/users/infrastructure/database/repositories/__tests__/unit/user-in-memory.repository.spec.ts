import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserInMemoryRepository } from '../../user-in-memory.repository';
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { ConflictError } from '@/shared/domain/errors/conflict-error';

describe('UserInMemoryRepository unit tests', () => {
  let sut: UserInMemoryRepository;

  beforeEach(() => {
    sut = new UserInMemoryRepository();
  });

  it('Should throw error when not found - findByEmail method', async () => {
    await expect(sut.findByEmail('a@a.com')).rejects.toThrow(
      new NotFoundError('User not found: a@a.com'),
    );
  });

  it('Should find entity by email - findByEmail method', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    const result = await sut.findByEmail(entity.email);
    expect(entity.toJSON()).toEqual(result.toJSON());
  });

  it('Should throw error when found - emailExits method', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);

    await expect(sut.emailExists(entity.email)).rejects.toThrow(
      new ConflictError('Email already exists: ' + entity.email),
    );
  });

  it('Should not throw error when not found - emailExits method', async () => {
    expect.assertions(0);
    await sut.emailExists('a@a.com');
  });
});
