import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlanoService } from './plano.service';
import { CreatePlanoDto } from './dto/create-plano.dto';

@Controller('plano')
export class PlanoController {
  constructor(private readonly planoService: PlanoService) {}

  @Post()
  create(@Body() createPlanoDto: CreatePlanoDto) {
    return this.planoService.create(createPlanoDto);
  }

  @Get()
  findAll() {
    return this.planoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planoService.findOne(+id);
  }
}
