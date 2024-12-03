import { Injectable } from '@nestjs/common';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { SaldoService } from '../saldo/saldo.service';
import { PlanoService } from '../plano/plano.service';
import { PlanoEnum } from '../plano/enums/plano.enum';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
    private saldoService: SaldoService,
    private planoService: PlanoService,
  ) {}

  async create(mensagem: Partial<Mensagem>): Promise<Mensagem> {
    const podeEnviar = await this.verificaPodeEnviarMensagem(
      mensagem?.cliente_id,
    );

    if (!podeEnviar) {
      return;
    }

    const novaMensagem = this.mensagemRepository.create(mensagem);
    return this.mensagemRepository.save(novaMensagem);
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return this.mensagemRepository.findOneBy({ id });
  }

  update(id: number, updateMensagemDto: UpdateMensagemDto) {
    return this.mensagemRepository.update(id, updateMensagemDto);
  }

  remove(id: number) {
    return this.mensagemRepository.delete({ id });
  }

  private async getDadosCliente(cliente_id: number) {
    const financeiroCliente =
      await this.saldoService.findByClienteID(cliente_id);
    const planoCliente = await this.planoService.findOne(
      financeiroCliente?.plano_id,
    );

    return {
      financeiroCliente,
      planoCliente,
    };
  }

  private async verificaPodeEnviarMensagem(
    client_id: number,
  ): Promise<boolean> {
    const dadosCliente = await this.getDadosCliente(client_id);
    const { planoCliente, financeiroCliente } = dadosCliente;

    if (planoCliente.tipo === PlanoEnum.prePago) {
      return financeiroCliente.saldo >= 0.25;
    }

    if (planoCliente.tipo === PlanoEnum.posPago) {
      return planoCliente.limite_mensal >= financeiroCliente.limite_utilizado;
    }

    return false;
  }
}
