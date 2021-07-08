import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const LUser = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return req.lUser;
  },
);
