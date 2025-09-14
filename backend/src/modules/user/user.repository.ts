import dataSource from '~/infra/database/data-source';
import { User } from './entities/user.entity';

export const userRepository = dataSource.getRepository(User);
