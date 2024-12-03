import { Module } from '@nestjs/common';
import { MensagemService } from './mensagem.service';
import { MensagemController } from './mensagem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { MensagemGateway } from './mensagem.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Mensagem])],
  controllers: [MensagemController],
  providers: [MensagemService, MensagemGateway],
})
export class MensagemModule {}
