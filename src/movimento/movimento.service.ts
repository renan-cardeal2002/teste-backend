import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
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
    const novoMovimento = this.movimentoRepository.create(createMovimentoDto);
    return this.movimentoRepository.save(novoMovimento);
  }

  findAll() {
    return this.movimentoRepository.find();
  }

  findOne(id: number) {
    return this.movimentoRepository.findOneBy({ id });
  }
}
