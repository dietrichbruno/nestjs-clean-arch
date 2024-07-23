import { Entity } from '@/shared/domain/entities/entity';
import { InMemoryRepository } from '../../in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';

type StubEntityProps = {
  name: string;
  price: string;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository unit tests', () => {
  let repository: StubInMemoryRepository;

  beforeEach(() => {
    repository = new StubInMemoryRepository();
  });

  it('should insert an entity', async () => {
    const entity = new StubEntity({ name: 'test name', price: '10.00' });
    await repository.insert(entity);
    expect(repository.items).toHaveLength(1);
    expect(repository.items[0]).toEqual(entity);
  });

  it('should fail to find an entity by id', async () => {
    await expect(repository.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('should find an entity by id', async () => {
    const entity = new StubEntity({ name: 'Test', price: '10.00' });
    await repository.insert(entity);
    const foundEntity = await repository.findById(entity.id);
    expect(foundEntity.toJSON()).toEqual(entity.toJSON());
  });

  it('should find all entities', async () => {
    const entity = new StubEntity({ name: 'Test', price: '10.00' });
    await repository.insert(entity);
    const entities = await repository.findAll();
    expect(entities).toHaveLength(1);
    expect(entities[0]).toEqual(entity);
  });
});
