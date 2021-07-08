import {
  Body,
  Request as Req,
  Response as Res,
  Controller,
  Get,
  Post,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { RESULT_STATUSES } from 'src/constants/common';
import { LoginDTO } from 'src/models/dto/LoginDTO';
import { UserDTO } from 'src/models/dto/UserDTO';
import { SessionService } from 'src/services/SessionService';
import { UserService } from 'src/services/UserService';

@Controller('api/users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  @Get()
  async getUser(@Req() req: Request): Promise<UserDTO> {
    const sid = req.cookies?.sid;
    if (!sid) {
      throw new NotFoundException();
    }
    const session = await this.sessionService.getById(sid);
    if (!session) {
      throw new NotFoundException();
    }
    const user = await this.userService.getById(session.payload.userId);
    if (!user) {
      throw new NotFoundException();
    }

    return user.toDTO();
  }

  @Post('/login')
  async login(@Body() dto: LoginDTO, @Res() res: Response) {
    const user = await this.userService.autheticate(dto);
    if (user) {
      const session = await this.sessionService.create({ userId: user.id });
      res.cookie('sid', session.id, {
        sameSite: 'none',
        maxAge: 900000,
        httpOnly: true,
        secure: true,
      });
      return res.send({
        status: RESULT_STATUSES.SUCESS,
        data: user.toDTO(),
      });
    }
    return res.send({
      status: RESULT_STATUSES.ERROR,
      error: 'User not found',
    });
  }
}
