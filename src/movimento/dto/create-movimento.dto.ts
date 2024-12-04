import { TipoMovimento } from '../enums/tipo.enum';
import { IsNotEmpty } from 'class-validator';

export class CreateMovimentoDto {
  @IsNotEmpty()
  cliente_id: number;

  @IsNotEmpty()
  tipo: TipoMovimento;

  @IsNotEmpty()
  valor: number;
  observacao: string;
}
