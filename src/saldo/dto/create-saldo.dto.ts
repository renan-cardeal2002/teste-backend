import { IsNotEmpty } from 'class-validator';

export class CreateSaldoDto {
  @IsNotEmpty()
  cliente_id: number;

  @IsNotEmpty()
  plano_id: number;

  @IsNotEmpty()
  saldo: number;

  @IsNotEmpty()
  limite_utilizado: number;
}
