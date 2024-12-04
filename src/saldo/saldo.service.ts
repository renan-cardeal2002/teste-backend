import { Injectable } from '@nestjs/common';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Saldo } from './entities/saldo.entity';
import { CreateMovimentoDto } from '../movimento/dto/create-movimento.dto';
import { TipoMovimento, VALOR_DEFAULT_MSG } from '../movimento/enums/tipo.enum';
import { PlanoEnum } from '../cliente/enums/plano.enum';
import { ClienteService } from '../cliente/cliente.service';

@Injectable()
export class SaldoService {
  constructor(
    @InjectRepository(Saldo)
    private saldoRepository: Repository<Saldo>,
    private clienteService: ClienteService,
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

  updateByClienteID(cliente_id: number, updateFinanceiroDto: UpdateSaldoDto) {
    return this.saldoRepository.update({ cliente_id }, updateFinanceiroDto);
  }

  private async getDadosCliente(cliente_id: number) {
    const financeiroCliente = await this.findByClienteID(cliente_id);
    const cliente = await this.clienteService.findOne(cliente_id);

    return {
      financeiroCliente,
      cliente,
    };
  }

  async verificaSaldoLimite(client_id: number): Promise<boolean> {
    const dadosCliente = await this.getDadosCliente(client_id);
    const { financeiroCliente } = dadosCliente;

    if (financeiroCliente.plano_id === PlanoEnum.prePago) {
      return financeiroCliente.saldo >= VALOR_DEFAULT_MSG;
    }

    if (financeiroCliente.plano_id === PlanoEnum.posPago) {
      return (
        financeiroCliente.limite_mensal >=
        financeiroCliente.limite_utilizado + VALOR_DEFAULT_MSG
      );
    }

    return false;
  }

  async movimentarSaldoCliente(movimentoDto: CreateMovimentoDto) {
    const dadosCliente = await this.getDadosCliente(movimentoDto.cliente_id);
    const { financeiroCliente } = dadosCliente;
    let newSaldo = Number(financeiroCliente.saldo);
    let newLimiteUtilizado = Number(financeiroCliente.limite_utilizado);

    if (financeiroCliente.plano_id == PlanoEnum.prePago) {
      if (movimentoDto.tipo === TipoMovimento.debito) {
        newSaldo -= movimentoDto.valor;
      }
      if (movimentoDto.tipo === TipoMovimento.credito) {
        newSaldo += movimentoDto.valor;
      }
    }

    if (financeiroCliente.plano_id == PlanoEnum.posPago) {
      if (movimentoDto.tipo === TipoMovimento.debito) {
        newLimiteUtilizado += movimentoDto.valor;
      }
      if (movimentoDto.tipo === TipoMovimento.credito) {
        newLimiteUtilizado -= movimentoDto.valor;
      }
    }

    await this.saldoRepository.update(
      { cliente_id: movimentoDto.cliente_id },
      { saldo: newSaldo, limite_utilizado: newLimiteUtilizado },
    );
  }
}
