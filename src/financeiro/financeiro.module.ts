import { Module } from '@nestjs/common';
import { FinanceiroService } from './financeiro.service';
import { FinanceiroController } from './financeiro.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Financeiro } from './entities/financeiro.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Financeiro])],
  controllers: [FinanceiroController],
  providers: [FinanceiroService],
})
export class FinanceiroModule {}
