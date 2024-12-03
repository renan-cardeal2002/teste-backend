import { Module } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { SaldoController } from './saldo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Financeiro } from './entities/saldo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Financeiro])],
  controllers: [SaldoController],
  providers: [SaldoService],
})
export class SaldoModule {}
