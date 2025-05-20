import { Provider } from '@nestjs/common';
import { IUserRepository } from 'src/core/ports/user';
import { UserRepository } from 'src/infrastructure/user';

export function createUserUseCaseProvider(useCase: any): Provider {
  return {
    provide: useCase,
    useFactory: (userRepo: IUserRepository) => new useCase(userRepo),
    inject: [UserRepository],
  };
}
