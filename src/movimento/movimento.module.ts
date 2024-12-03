import { Module } from '@nestjs/common';
import { MovimentoService } from './movimento.service';
import { MovimentoController } from './movimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimento } from './entities/movimento.entity';
import { SaldoModule } from '../saldo/saldo.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movimento]), SaldoModule],
  controllers: [MovimentoController],
  providers: [MovimentoService],
  exports: [MovimentoService],
})
export class MovimentoModule {}
