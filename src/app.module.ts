import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { FinanceiroModule } from './financeiro/financeiro.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { Financeiro } from './financeiro/entities/financeiro.entity';
import { Mensagem } from './mensagem/entities/mensagem.entity';
import { PlanoModule } from './plano/plano.module';
import { Plano } from './plano/entities/plano.entity';

@Module({
  imports: [
    ClienteModule,
    MensagemModule,
    FinanceiroModule,
    PlanoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'user',
      password: 'password',
      database: 'database',
      entities: [Cliente, Financeiro, Mensagem, Plano],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
