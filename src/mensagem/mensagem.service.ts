import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { SaldoService } from '../saldo/saldo.service';
import { MovimentoService } from '../movimento/movimento.service';
import { TipoMovimento, VALOR_DEFAULT_MSG } from '../movimento/enums/tipo.enum';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
    private saldoService: SaldoService,
    private movimentoService: MovimentoService,
  ) {}

  async create(mensagem: Partial<Mensagem>): Promise<Mensagem> {
    const podeEnviar = await this.saldoService.verificaSaldoLimite(
      mensagem?.cliente_id,
    );

    if (!podeEnviar) {
      throw new BadRequestException(
        'Cliente não possui saldo suficiente ou limite disponível para enviar a mensagem.',
      );
    }

    const movimentoDto = {
      cliente_id: mensagem.cliente_id,
      observacao: 'Movimento gerado automáticamente',
      tipo: TipoMovimento.debito,
      valor: VALOR_DEFAULT_MSG,
    };
    await this.movimentoService.create(movimentoDto);
    const novaMensagem = this.mensagemRepository.create(mensagem);
    return this.mensagemRepository.save(novaMensagem);
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return this.mensagemRepository.findOneBy({ id });
  }
}
