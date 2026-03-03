import { Module } from '@nestjs/common';
import { TurmasService } from './turmas.service';
import { TurmasController } from './turmas.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [TurmasController],
  providers: [TurmasService],
  exports: [TurmasService]
})
export class TurmasModule {}
