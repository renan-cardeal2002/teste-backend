import { TipoMovimento } from '../enums/tipo.enum';

export class CreateMovimentoDto {
  cliente_id: number;
  tipo: TipoMovimento;
  valor: number;
  observacao: string;
}
