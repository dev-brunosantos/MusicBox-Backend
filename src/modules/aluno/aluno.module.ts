import { Module } from '@nestjs/common';
import { AlunoService } from './aluno.service';
import { AlunoController } from './aluno.controller';
import { DbModule } from 'src/db/db.module';
import { MatriculaModule } from '../matricula/matricula.module';
import { TurmasModule } from '../turmas/turmas.module';

@Module({
  imports: [DbModule, MatriculaModule, TurmasModule],
  controllers: [AlunoController],
  providers: [AlunoService],
  exports: [AlunoService],
})
export class AlunoModule {}
