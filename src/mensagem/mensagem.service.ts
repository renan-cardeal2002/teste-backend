import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';
import { SaldoService } from '../saldo/saldo.service';
import { MovimentoService } from '../movimento/movimento.service';
import { TipoMovimento, VALOR_DEFAULT_MSG } from '../movimento/enums/tipo.enum';
import { DataSource } from 'typeorm';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
    private saldoService: SaldoService,
    private movimentoService: MovimentoService,
    private dataSource: DataSource,
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

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const movimentoDto = {
        cliente_id: mensagem.cliente_id,
        observacao: 'envio de mensagem',
        tipo: TipoMovimento.debito,
        valor: VALOR_DEFAULT_MSG,
      };
      await this.movimentoService.create(movimentoDto);

      const novaMensagem = this.mensagemRepository.create(mensagem);
      const mensagemSalva = await this.mensagemRepository.save(novaMensagem);

      await queryRunner.commitTransaction();
      return mensagemSalva;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return this.mensagemRepository.findOneBy({ id });
  }
}
