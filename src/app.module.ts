import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { SaldoModule } from './saldo/saldo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './cliente/entities/cliente.entity';
import { Saldo } from './saldo/entities/saldo.entity';
import { Mensagem } from './mensagem/entities/mensagem.entity';
import { MovimentoModule } from './movimento/movimento.module';
import { Movimento } from './movimento/entities/movimento.entity';

@Module({
  imports: [
    ClienteModule,
    MensagemModule,
    SaldoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5436,
      username: 'user',
      password: 'password',
      database: 'database',
      entities: [Cliente, Saldo, Movimento, Mensagem],
      synchronize: false,
    }),
    MovimentoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
