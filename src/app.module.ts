import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { SaldoModule } from './saldo/saldo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { Financeiro } from './saldo/entities/saldo.entity';
import { Mensagem } from './mensagem/entities/mensagem.entity';
import { PlanoModule } from './plano/plano.module';
import { Plano } from './plano/entities/plano.entity';
import { MovimentoModule } from './movimento/movimento.module';

@Module({
  imports: [
    ClienteModule,
    MensagemModule,
    SaldoModule,
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
    MovimentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
