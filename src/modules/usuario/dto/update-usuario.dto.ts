import { IsEnum, IsOptional, IsString, MinLength } from 'class-validator';
import { Cargo } from 'src/generated/prisma/enums';

export class UpdateUsuarioDto {
    @IsString()
    @MinLength(3, { message: "O nome deve conter pelo menos 3 caracteres." })
    nome: string;

    @IsOptional()
    @IsString()
    @MinLength(6, { message: "O nome deve conter pelo menos 3 caracteres." })
    senha: string;

    @IsEnum(Cargo, { message: "Cargo deve ser um valor válido." })
    cargo: Cargo;
}
