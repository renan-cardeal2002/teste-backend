import { Injectable } from '@nestjs/common';
import { CreatePlanoDto } from './dto/create-plano.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Plano } from './entities/plano.entity';

@Injectable()
export class PlanoService {
  constructor(
    @InjectRepository(Plano)
    private planoRepository: Repository<Plano>,
  ) {}

  create(createPlanoDto: CreatePlanoDto) {
    return this.planoRepository.create(createPlanoDto);
  }

  findAll() {
    return this.planoRepository.find();
  }

  findOne(id: number) {
    return this.planoRepository.findOneBy({ id });
  }
}
