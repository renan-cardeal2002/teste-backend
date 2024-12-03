import { Injectable } from '@nestjs/common';
import { CreateMensagemDto } from './dto/create-mensagem.dto';
import { UpdateMensagemDto } from './dto/update-mensagem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mensagem } from './entities/mensagem.entity';

@Injectable()
export class MensagemService {
  constructor(
    @InjectRepository(Mensagem)
    private mensagemRepository: Repository<Mensagem>,
  ) {}

  async create(mensagem: Partial<Mensagem>): Promise<Mensagem> {
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
}
