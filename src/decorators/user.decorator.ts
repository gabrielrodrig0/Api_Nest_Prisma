import { createParamDecorator, ExecutionContext, NotFoundException } from "@nestjs/common";

export const User = createParamDecorator(
    (data: any, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();

      if(!request.user)
      {
        throw new NotFoundException("Usuário não encontrado!")
      }
      return request.user;
    },
  );
