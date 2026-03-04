import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './modules/auth/auth.module';
import { AlunoModule } from './modules/aluno/aluno.module';
import { TurmasModule } from './modules/turmas/turmas.module';
import { PagamentoModule } from './modules/pagamento/pagamento.module';
import { MatriculaModule } from './modules/matricula/matricula.module';
import { FrequenciaModule } from './modules/frequencia/frequencia.module';
import { HistoricoModule } from './modules/historico/historico.module';

@Module({
  imports: [UsuarioModule, AuthModule, AlunoModule, TurmasModule, PagamentoModule, MatriculaModule, FrequenciaModule, HistoricoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
