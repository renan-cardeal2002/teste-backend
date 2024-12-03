import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('saldo')
export class Financeiro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column()
  plano_id: number;

  @Column()
  saldo: number;

  @Column()
  limite_utilizado: number;
}