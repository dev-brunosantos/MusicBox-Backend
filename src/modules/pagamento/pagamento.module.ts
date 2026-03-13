import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { DbModule } from 'src/db/db.module';
import { AlunoModule } from '../aluno/aluno.module';

@Module({
  imports: [
    DbModule,
    AlunoModule
  ],
  controllers: [PagamentoController],
  providers: [PagamentoService],
})
export class PagamentoModule {}
