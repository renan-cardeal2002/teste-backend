import { Injectable } from '@nestjs/common';
import { CreateFinanceiroDto } from './dto/create-financeiro.dto';
import { UpdateFinanceiroDto } from './dto/update-financeiro.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Financeiro } from './entities/financeiro.entity';

@Injectable()
export class FinanceiroService {
  constructor(
    @InjectRepository(Financeiro)
    private financeiroRepository: Repository<Financeiro>,
  ) {}

  create(createFinanceiroDto: CreateFinanceiroDto) {
    return this.financeiroRepository.create(createFinanceiroDto);
  }

  findAll() {
    return this.financeiroRepository.find();
  }

  findOne(id: number) {
    return this.financeiroRepository.findOneBy({ id });
  }

  update(id: number, updateFinanceiroDto: UpdateFinanceiroDto) {
    return this.financeiroRepository.update(id, updateFinanceiroDto);
  }

  remove(id: number) {
    return this.financeiroRepository.delete(id);
  }
}
