import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ParamId = createParamDecorator(
    (data: any, context: ExecutionContext) => {
      const request = context.switchToHttp().getRequest();
      return Number(request.params.id);
    },
  );
