import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { MensagemModule } from './mensagem/mensagem.module';
import { SaldoModule } from './saldo/saldo.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { Saldo } from './saldo/entities/saldo.entity';
import { Mensagem } from './mensagem/entities/mensagem.entity';
import { MovimentoModule } from './movimento/movimento.module';
import { Movimento } from './movimento/entities/movimento.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClienteModule,
    MensagemModule,
    SaldoModule,
    MovimentoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Cliente, Saldo, Movimento, Mensagem],
      synchronize: false,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
