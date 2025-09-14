import { Nullable } from '~/shared/types';
import { User } from './entities/user.entity';
import { userRepository } from './user.repository';

export const userService = {
  findOneByEmail(email: string): Promise<Nullable<User>> {
    return userRepository.findOneBy({ email });
  },

  findOneById(id: number): Promise<Nullable<User>> {
    return userRepository.findOneBy({ id });
  },
};
