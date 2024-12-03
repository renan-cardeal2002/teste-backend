import { Injectable } from '@nestjs/common';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Financeiro } from './entities/saldo.entity';

@Injectable()
export class SaldoService {
  constructor(
    @InjectRepository(Financeiro)
    private financeiroRepository: Repository<Financeiro>,
  ) {}

  create(createFinanceiroDto: CreateSaldoDto) {
    return this.financeiroRepository.create(createFinanceiroDto);
  }

  findAll() {
    return this.financeiroRepository.find();
  }

  findOne(id: number) {
    return this.financeiroRepository.findOneBy({ id });
  }

  async consultarSaldoCliente(cliente_id: number) {
    return {
      saldo: (await this.financeiroRepository.findOneBy({ cliente_id })).saldo,
    };
  }

  findByClienteID(cliente_id: number) {
    return this.financeiroRepository.findOneBy({ cliente_id });
  }

  update(id: number, updateFinanceiroDto: UpdateSaldoDto) {
    return this.financeiroRepository.update(id, updateFinanceiroDto);
  }

  remove(id: number) {
    return this.financeiroRepository.delete(id);
  }
}
