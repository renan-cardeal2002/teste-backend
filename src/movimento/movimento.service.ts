import { Injectable } from '@nestjs/common';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';

@Injectable()
export class MovimentoService {
  create(createMovimentoDto: CreateMovimentoDto) {
    return 'This action adds a new movimento';
  }

  findAll() {
    return `This action returns all movimento`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimento`;
  }

  update(id: number, updateMovimentoDto: UpdateMovimentoDto) {
    return `This action updates a #${id} movimento`;
  }

  remove(id: number) {
    return `This action removes a #${id} movimento`;
  }
}
