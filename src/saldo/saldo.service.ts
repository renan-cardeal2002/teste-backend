import { Injectable } from '@nestjs/common';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saldo } from './entities/saldo.entity';
import { CreateMovimentoDto } from '../movimento/dto/create-movimento.dto';
import { TipoMovimento } from '../movimento/enums/tipo.enum';

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

  async movimentarSaldoCliente(movimentoDto: CreateMovimentoDto) {
    const saldo = await this.consultarSaldoCliente(movimentoDto.cliente_id);
    let newSaldo = saldo.saldo;

    if (movimentoDto.tipo === TipoMovimento.debito) {
      newSaldo -= movimentoDto.valor;
    }
    if (movimentoDto.tipo === TipoMovimento.credito) {
      newSaldo += movimentoDto.valor;
    }

    await this.saldoRepository.update(
      { cliente_id: movimentoDto.cliente_id },
      { saldo: newSaldo },
    );
  }
}
