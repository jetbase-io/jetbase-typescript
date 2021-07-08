import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Injectable,
} from '@nestjs/common';
import { SessionService } from 'src/services/SessionService';

import { UserService } from 'src/services/UserService';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const sid = request.session?.sid;
    if (!sid) {
      throw new UnauthorizedException();
    }
    const session = await this.sessionService.getById(sid);
    if (!session) {
      throw new UnauthorizedException();
    }
    const user = await this.userService.getById(session.payload.userId);
    if (!user) {
      throw new UnauthorizedException();
    }

    request.lUser = user;

    return true;
  }
}
