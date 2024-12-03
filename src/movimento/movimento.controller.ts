import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MovimentoService } from './movimento.service';
import { CreateMovimentoDto } from './dto/create-movimento.dto';

@Controller('movimento')
export class MovimentoController {
  constructor(private readonly movimentoService: MovimentoService) {}

  @Post()
  create(@Body() createMovimentoDto: CreateMovimentoDto) {
    return this.movimentoService.create(createMovimentoDto);
  }

  @Get()
  findAll() {
    return this.movimentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.movimentoService.findOne(+id);
  }
}
