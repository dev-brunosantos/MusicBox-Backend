import { IsDateString, IsEnum, IsNumber, IsString } from "class-validator";
import { StatusFrequencia } from "src/generated/prisma/enums";

export class CreateFrequenciaDto {
  @IsNumber({}, { message: 'O campo matriculaID deve ser um número.' })
  matriculaID: number;

  @IsEnum(StatusFrequencia, { message: 'O campo status deve ser um valor válido de StatusFrequencia.' })
  status: StatusFrequencia;
  
  @IsString()
  observacao?: string;

  @IsDateString()
  dataAula: Date;
}
