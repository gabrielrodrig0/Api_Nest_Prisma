import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        //Aqui, é o começo da requisição.
        const dataInit = Date.now();
        

        //Após retornar a função, o método já vai ser executado, ou seja, tudo abbaixo do next.handle() é após a requisição
        return next.handle().pipe(tap(()=>{
            console.log("A Execução levou: "+(Date.now()-dataInit))
        }))

    }
}