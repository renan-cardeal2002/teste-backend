import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { MensagemGateway } from './mensagem.gateway';
import { SaldoModule } from '../saldo/saldo.module';
import { PlanoModule } from '../plano/plano.module';

@Module({
  imports: [TypeOrmModule.forFeature([Mensagem]), SaldoModule, PlanoModule],
  controllers: [MensagemController],
  providers: [MensagemService, MensagemGateway],
})
export class MensagemModule {}
