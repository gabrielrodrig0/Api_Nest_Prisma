import { Injectable } from "@nestjs/common";
import { writeFile } from "fs";

@Injectable()

export class FileService {
    async upload(file: Express.Multer.File, path:string)
    {
        const result = writeFile(path, file.buffer, (err)=>{
            if (err) 
                console.log(err);
              else {
                console.log("Arquivo criado com sucesso!\n");
              }
        })

        return result;
    }
}