import { StatusAluno } from "src/generated/prisma/enums";

export class CreateMatriculaDto {
  alunoID?: string;
  turmaID: number;
  statusMatricula: StatusAluno;
}
