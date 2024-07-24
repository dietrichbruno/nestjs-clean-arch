import { ConflictError } from '@/shared/domain/errors/conflict-error';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { InMemorySearchableRepository } from '@/shared/domain/repositories/in-memory.searchable.repository';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';

export class UserInMemoryRepository
  extends InMemorySearchableRepository<UserEntity>
  implements UserRepository
{
  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.items.find(item => item.email === email);
    if (!user) {
      throw new NotFoundError(`User not found: ${email}`);
    }
    return user;
  }

  async emailExists(email: string): Promise<void> {
    const user = this.items.find(item => item.email === email);
    if (user) {
      throw new ConflictError(`Email already exists: ${email}`);
    }
  }
}
