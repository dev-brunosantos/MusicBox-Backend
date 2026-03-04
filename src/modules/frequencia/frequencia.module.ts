import { Module } from '@nestjs/common';
import { FrequenciaService } from './frequencia.service';
import { FrequenciaController } from './frequencia.controller';
import { DbModule } from 'src/db/db.module';
import { MatriculaModule } from '../matricula/matricula.module';

@Module({
  imports: [
    DbModule,
    MatriculaModule
  ],
  controllers: [FrequenciaController],
  providers: [FrequenciaService],
})
export class FrequenciaModule {}
