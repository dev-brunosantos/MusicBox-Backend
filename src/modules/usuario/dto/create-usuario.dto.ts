import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Cargo } from "src/generated/prisma/enums";

export class CreateUsuarioDto {
    @IsString()
    @MinLength(3, { message: "O nome deve conter pelo menos 3 caracteres." })
    nome: string;
    
    @IsEmail({}, { message: "O email deve ser um endereço de email válido." })
    email: string;
    
    @IsString()
    @MinLength(6, { message: "A senha deve conter pelo menos 3 caracteres." })
    senha: string;
    
    @IsEnum(Cargo, { message: "Cargo deve ser um valor válido." })
    cargo: Cargo;

    @IsOptional()
    @IsString()
    turma?: string;
}
