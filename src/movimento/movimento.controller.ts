import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MovimentoService } from './movimento.service';
import { CreateMovimentoDto } from './dto/create-movimento.dto';
import { UpdateMovimentoDto } from './dto/update-movimento.dto';

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

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMovimentoDto: UpdateMovimentoDto,
  ) {
    return this.movimentoService.update(+id, updateMovimentoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.movimentoService.remove(+id);
  }
}
