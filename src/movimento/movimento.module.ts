import { Module } from '@nestjs/common';
import { MovimentoService } from './movimento.service';
import { MovimentoController } from './movimento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movimento } from './entities/movimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movimento])],
  controllers: [MovimentoController],
  providers: [MovimentoService],
})
export class MovimentoModule {}
