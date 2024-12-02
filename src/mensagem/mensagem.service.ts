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

  create(createMensagemDto: CreateMensagemDto) {
    return 'This action adds a new mensagem';
  }

  findAll() {
    return this.mensagemRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} mensagem`;
  }

  update(id: number, updateMensagemDto: UpdateMensagemDto) {
    return `This action updates a #${id} mensagem`;
  }

  remove(id: number) {
    return `This action removes a #${id} mensagem`;
  }
}
