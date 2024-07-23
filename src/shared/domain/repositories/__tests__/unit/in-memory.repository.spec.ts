import { Entity } from '@/shared/domain/entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('should insert an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: 10 });
    await repository.insert(entity);
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0]).toEqual(entity);
  });

  it('should fail to find an entity by id', async () => {
    await expect(repository.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it("should fail to find an entity by id when it doesn't exist", async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await repository.insert(entity);
    await expect(repository.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await repository.insert(entity);
    const foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toEqual(entity.toJSON());
  });

  it('should find all entities', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(entities[0]).toEqual(entity);
  });

  it("should throw an error when trying to update an entity that doesn't exist", async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should update an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await repository.insert(entity);
    const updatedEntity = new StubEntity(
      {
        name: 'Updated Test',
        price: 10,
      },
      entity.id,
    );
    await repository.update(updatedEntity);
    const foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toEqual(updatedEntity.toJSON());
  });

  it("should throw an error when trying to delete an entity that doesn't exist", async () => {
    await expect(repository.delete('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should delete an entity', async () => {
    const entity = new StubEntity({ name: 'Test', price: 10 });
    await repository.insert(entity);
    await repository.delete(entity.id);
    await expect(repository.findById(entity.id)).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });
});
