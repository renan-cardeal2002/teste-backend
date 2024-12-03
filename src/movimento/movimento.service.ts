import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimento } from './entities/movimento.entity';

@Injectable()
export class MovimentoService {
  constructor(
    @InjectRepository(Movimento)
    private movimentoRepository: Repository<Movimento>,
  ) {}

  create(createMovimentoDto: CreateMovimentoDto) {
    return this.movimentoRepository.create(createMovimentoDto);
  }

  findAll() {
    return this.movimentoRepository.find();
  }

  findOne(id: number) {
    return this.movimentoRepository.findOneBy({ id });
  }

  update(id: number, updateMovimentoDto: UpdateMovimentoDto) {
    return this.movimentoRepository.update({ id }, updateMovimentoDto);
  }

  remove(id: number) {
    return this.movimentoRepository.delete({ id });
  }
}
