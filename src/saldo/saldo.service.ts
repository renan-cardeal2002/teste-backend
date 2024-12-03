import { Injectable } from '@nestjs/common';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saldo } from './entities/saldo.entity';

@Injectable()
export class SaldoService {
  constructor(
    @InjectRepository(Saldo)
    private saldoRepository: Repository<Saldo>,
  ) {}

  create(createFinanceiroDto: CreateSaldoDto) {
    return this.saldoRepository.create(createFinanceiroDto);
  }

  findAll() {
    return this.saldoRepository.find();
  }

  findOne(id: number) {
    return this.saldoRepository.findOneBy({ id });
  }

  async consultarSaldoCliente(cliente_id: number) {
    return {
      saldo: (await this.saldoRepository.findOneBy({ cliente_id }))?.saldo || 0,
    };
  }

  findByClienteID(cliente_id: number) {
    return this.saldoRepository.findOneBy({ cliente_id });
  }

  update(id: number, updateFinanceiroDto: UpdateSaldoDto) {
    return this.saldoRepository.update({ id }, updateFinanceiroDto);
  }

  remove(id: number) {
    return this.saldoRepository.delete({ id });
  }
}
