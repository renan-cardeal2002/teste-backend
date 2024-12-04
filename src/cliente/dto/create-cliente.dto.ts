import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
  @IsNotEmpty()
  nome: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  telefone: string;

  @IsNotEmpty()
  cpf_responsavel: string;

  @IsNotEmpty()
  cnpj: string;

  @IsNotEmpty()
  nome_empresa: string;

  @IsNotEmpty()
  senha: string;
}
