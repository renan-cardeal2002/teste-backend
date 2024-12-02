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
    return 'This action adds a new financeiro';
  }

  findAll() {
    return this.financeiroRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} financeiro`;
  }

  update(id: number, updateFinanceiroDto: UpdateFinanceiroDto) {
    return `This action updates a #${id} financeiro`;
  }

  remove(id: number) {
    return `This action removes a #${id} financeiro`;
  }
}
