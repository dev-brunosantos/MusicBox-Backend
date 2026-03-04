import { PartialType } from '@nestjs/mapped-types';
import { CreateHistoricoAlunoDto } from './create-historico.dto';

export class UpdateHistoricoDto extends PartialType(CreateHistoricoAlunoDto) {}
