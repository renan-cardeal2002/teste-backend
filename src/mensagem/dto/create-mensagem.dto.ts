import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMensagemDto {
  @IsNumber()
  @IsNotEmpty()
  cliente_id: number;

  @IsString()
  @IsNotEmpty()
  numero_destino: string;

  @IsBoolean()
  is_whatsapp: boolean;

  @IsString()
  @IsNotEmpty()
  texto: string;
}
