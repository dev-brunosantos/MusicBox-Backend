import { TipoHistorico } from "src/generated/prisma/enums";

export class CreateHistoricoUsuarioDto {
    usuarioID: string;
    tipoHistorico: TipoHistorico;
    descricao: string;
}

export class CreateHistoricoAlunoDto {
    alunoID: string;
    tipoHistorico: TipoHistorico;
    descricao: string;
}
