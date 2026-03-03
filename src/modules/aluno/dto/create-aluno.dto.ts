import { HistoricoAluno, Pagamento } from "src/generated/prisma/client";
import { CreateMatriculaDto } from "src/modules/matricula/dto/create-matricula.dto";

export class CreateAlunoDto {
    usuarioID: string;
    turma: string;
    matriculas?: CreateMatriculaDto[];
    // pagamentos?: Pagamento[]
    // historicos?: HistoricoAluno[]
}
