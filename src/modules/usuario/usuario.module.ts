import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { AlunoModule } from '../aluno/aluno.module';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [AlunoModule, DbModule],
  controllers: [UsuarioController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
