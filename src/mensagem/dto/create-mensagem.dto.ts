import { IsNotEmpty } from 'class-validator';

export class CreateMensagemDto {
  @IsNotEmpty()
  cliente_id: number;

  @IsNotEmpty()
  numero_destino: string;

  @IsNotEmpty()
  is_whatsapp: boolean;

  @IsNotEmpty()
  texto: string;
}
