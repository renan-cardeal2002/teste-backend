import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { MensagemGateway } from './mensagem.gateway';
import { SaldoModule } from '../saldo/saldo.module';
import { ClienteModule } from '../cliente/cliente.module';
import { MovimentoModule } from '../movimento/movimento.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Mensagem]),
    SaldoModule,
    ClienteModule,
    MovimentoModule,
  ],
  controllers: [MensagemController],
  providers: [MensagemService, MensagemGateway],
})
export class MensagemModule {}
