import { IsEnum, IsString, MinLength } from "class-validator";
import { Instrumento } from "src/generated/prisma/enums";

export class CreateTurmaDto {
    @IsString()
    turma: string;
    
    @IsEnum(Instrumento, { message: "Instrumento deve ser um valor válido." })
    instrumento: Instrumento;
    
    @IsString()
    @MinLength(6, { message: "O nome deve conter pelo menos 6 caracteres." })
    dia: string
    
    @IsString()
    @MinLength(6, { message: "O nome deve conter pelo menos 6 caracteres." })
    horario: string;
}
