import { UserRepository } from '@/users/domain/repositories/user.repository';
import { BadRequestError } from '../../../shared/application/errors/bad-request-error';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { UserOutput, UserOutputMapper } from '../dtos/user-output';
import { UseCase as DefaultUseCase } from '@/shared/application/use-case';
import { InvalidCredentials } from '@/shared/application/errors/invalid-credentials';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace SigninUseCase {
  export type Input = {
    email: string;
    password: string;
  };

  export type Output = UserOutput;

  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private userRepository: UserRepository.Repository,
      private hashProvider: HashProvider,
    ) {}

    async execute(input: Input): Promise<Output> {
      const { email, password } = input;

      if (!email || !password) {
        throw new BadRequestError('Input data not provided');
      }

      const entity = await this.userRepository.findByEmail(email);

      const hashedPasswordMatches = await this.hashProvider.compareHash(
        password,
        entity.password,
      );

      if (!hashedPasswordMatches) {
        throw new InvalidCredentials('Invalid credentials');
      }

      return UserOutputMapper.toOutput(entity);
    }
  }
}
