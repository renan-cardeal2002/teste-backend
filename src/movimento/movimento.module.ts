import { Module } from '@nestjs/common';
import { MovimentoService } from './movimento.service';
import { MovimentoController } from './movimento.controller';

@Module({
  controllers: [MovimentoController],
  providers: [MovimentoService],
})
export class MovimentoModule {}
