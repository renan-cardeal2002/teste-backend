import { Module } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { SaldoController } from './saldo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Saldo } from './entities/saldo.entity';
import { ClienteModule } from '../cliente/cliente.module';

@Module({
  imports: [TypeOrmModule.forFeature([Saldo]), ClienteModule],
  controllers: [SaldoController],
  providers: [SaldoService],
  exports: [SaldoService],
})
export class SaldoModule {}
