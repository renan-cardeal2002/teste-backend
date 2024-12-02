import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('clientes')
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  cpf_responsavel: string;

  @Column()
  cnpj: string;

  @Column()
  nome_empresa: string;

  @Column()
  senha: string;
}
