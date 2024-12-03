import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { SaldoService } from '../saldo/saldo.service';
import { PlanoEnum } from '../cliente/enums/plano.enum';
import { ClienteService } from '../cliente/cliente.service';
import { MovimentoService } from '../movimento/movimento.service';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
    private clienteService: ClienteService,
    private saldoService: SaldoService,
    private movimentoService: MovimentoService,
  ) {}

  async create(mensagem: Partial<Mensagem>): Promise<Mensagem> {
    const podeEnviar = await this.verificaPodeEnviarMensagem(
      mensagem?.cliente_id,
    );

    if (!podeEnviar) {
      throw new BadRequestException(
        'Cliente não possui saldo suficiente ou limite disponível para enviar a mensagem.',
      );
    }

    await this.movimentoService.create({
      cliente_id: mensagem.cliente_id,
      observacao: 'Movimento gerado automáticamente',
      tipo: 'D',
      valor: 0.25,
    });

    const novaMensagem = this.mensagemRepository.create(mensagem);
    return this.mensagemRepository.save(novaMensagem);
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return this.mensagemRepository.findOneBy({ id });
  }

  private async getDadosCliente(cliente_id: number) {
    const financeiroCliente =
      await this.saldoService.findByClienteID(cliente_id);

    const cliente = await this.clienteService.findOne(cliente_id);

    return {
      financeiroCliente,
      cliente,
    };
  }

  private async verificaPodeEnviarMensagem(
    client_id: number,
  ): Promise<boolean> {
    const dadosCliente = await this.getDadosCliente(client_id);
    const { financeiroCliente } = dadosCliente;

    if (financeiroCliente.plano_id === PlanoEnum.prePago) {
      return financeiroCliente.saldo >= 0.25;
    }

    if (financeiroCliente.plano_id === PlanoEnum.posPago) {
      return (
        financeiroCliente.limite_mensal >= financeiroCliente.limite_utilizado
      );
    }

    return false;
  }
}
