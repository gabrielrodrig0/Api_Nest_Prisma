import { somar } from "../utils/soma";

test("Esse é o meu primeiro teste",()=>{
    const resultado = somar(1,3);

    expect(resultado).toEqual(4);
})