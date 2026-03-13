import { IsEnum, IsNumber, IsString } from "class-validator";
import { StatusPagamento, TipoPagamento } from "src/generated/prisma/enums"

export class CreatePagamentoDto {
    @IsString()
    alunoID: string;

    @IsNumber()
    valor: number;

    @IsEnum(TipoPagamento, { message: 'tipoPagamento deve ser um valor válido de TipoPagamento' })
    tipoPagamento: TipoPagamento;
    
    @IsEnum(StatusPagamento, { message: 'statusPagamento deve ser um valor válido de StatusPagamento' })
    statusPagamento: StatusPagamento;
}
