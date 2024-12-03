import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { SaldoService } from './saldo.service';
import { CreateSaldoDto } from './dto/create-saldo.dto';
import { UpdateSaldoDto } from './dto/update-saldo.dto';

@Controller('financeiro')
export class SaldoController {
  constructor(private readonly financeiroService: SaldoService) {}

  @Post()
  create(@Body() createFinanceiroDto: CreateSaldoDto) {
    return this.financeiroService.create(createFinanceiroDto);
  }

  @Get()
  findAll() {
    return this.financeiroService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.financeiroService.findOne(+id);
  }

  @Get('cliente/:id')
  findByClienteID(@Param('id') cliente_id: string) {
    return this.financeiroService.findByClienteID(+cliente_id);
  }

  @Get('cliente/saldo/:id')
  consultarSaldoCliente(@Param('id') cliente_id: string) {
    return this.financeiroService.consultarSaldoCliente(+cliente_id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFinanceiroDto: UpdateSaldoDto) {
    return this.financeiroService.update(+id, updateFinanceiroDto);
  }
}
