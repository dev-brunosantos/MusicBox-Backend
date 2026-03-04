import { Module } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { HistoricoController } from './historico.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [HistoricoController],
  providers: [HistoricoService],
  exports: [HistoricoService],
})
export class HistoricoModule {}
