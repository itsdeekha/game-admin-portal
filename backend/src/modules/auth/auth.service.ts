import { BadRequestException, NotFoundException } from '~/shared/exception';
import { signJwt } from '~/shared/utils/jwt';
import { userService } from '../user/user.service';
import { SignInDto } from './auth.interface';

export const authService = {
  async signIn(dto: SignInDto) {
    const { email, password } = dto;
    const user = await userService.findOneByEmail(email);

    if (!user) {
      throw new NotFoundException('user');
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new BadRequestException('Incorrect credentials');
    }

    const accessToken = signJwt({
      userId: user.id,
      role: user.role,
    });

    return {
      accessToken,
      user,
    };
  },

  async me(id: number) {
    return userService.findOneById(id);
  },
};
