import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { TurmasModule } from './modules/turmas/turmas.module';
import { PagamentoModule } from './modules/pagamento/pagamento.module';

@Module({
  imports: [DbModule, UsuarioModule, AuthModule, AlunoModule, TurmasModule, PagamentoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
