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

  it('Should no filter item when filter object is null', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    await sut.insert(entity);
    const result = await sut.findAll();
    const itensFiltered = await sut['applyFilter'](result, null);
    const spyFilter = jest.spyOn(result, 'filter');
    expect(spyFilter).not.toHaveBeenCalled();
    expect(itensFiltered).toStrictEqual(result);
  });

  it('Should filter name field using filter param', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'Test' })),
      new UserEntity(UserDataBuilder({ name: 'TEST' })),
      new UserEntity(UserDataBuilder({ name: 'Jim Doe' })),
    ];

    const spyFilter = jest.spyOn(items, 'filter');
    const itensFiltered = await sut['applyFilter'](items, 'TEST');
    expect(spyFilter).toHaveBeenCalled();
    expect(itensFiltered).toStrictEqual([items[0], items[1]]);
  });

  it('Should sort by createdAt when sort param is null', async () => {
    const createdAt = new Date();

    const items = [
      new UserEntity(UserDataBuilder({ name: 'Test', createdAt })),
      new UserEntity(
        UserDataBuilder({
          name: 'TEST',
          createdAt: new Date(createdAt.getTime() + 1),
        }),
      ),
      new UserEntity(
        UserDataBuilder({
          name: 'Jim Doe',
          createdAt: new Date(createdAt.getTime() + 2),
        }),
      ),
    ];

    const itensSorted = await sut['applySort'](items, null, null);
    expect(itensSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it('Should sort by name field', async () => {
    const items = [
      new UserEntity(UserDataBuilder({ name: 'c' })),
      new UserEntity(
        UserDataBuilder({
          name: 'd',
        }),
      ),
      new UserEntity(
        UserDataBuilder({
          name: 'a',
        }),
      ),
    ];

    let itensSorted = await sut['applySort'](items, 'name', 'asc');
    expect(itensSorted).toStrictEqual([items[2], items[0], items[1]]);

    itensSorted = await sut['applySort'](items, 'name', null);
    expect(itensSorted).toStrictEqual([items[1], items[0], items[2]]);
  });
});
