import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movimento } from './entities/movimento.entity';
import { SaldoService } from '../saldo/saldo.service';

@Injectable()
export class MovimentoService {
  constructor(
    @InjectRepository(Movimento)
    private movimentoRepository: Repository<Movimento>,
    private saldoService: SaldoService,
  ) {}

  async create(createMovimentoDto: CreateMovimentoDto) {
    const novoMovimento = this.movimentoRepository.create(createMovimentoDto);
    const movimentoCriado = await this.movimentoRepository.save(novoMovimento);
    await this.saldoService.movimentarSaldoCliente(createMovimentoDto);
    return movimentoCriado;
  }

  findAll() {
    return this.movimentoRepository.find();
  }

  findByClienteID(cliente_id: number) {
    return this.movimentoRepository.findOneBy({ cliente_id });
  }

  findOne(id: number) {
    return this.movimentoRepository.findOneBy({ id });
  }
}
