import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class ClassInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        // Antes da requisição
        console.log(context.getClass().name); // Isso retorna o construtor da classe

        console.log(
            context.switchToHttp().getRequest().url)

        // Após a requisição
        return next.handle().pipe(tap(() => {
                console.log(context.getClass().name.toUpperCase());
                console.log(
                    context.switchToHttp().getRequest().url)
            })
        );
    }
}
