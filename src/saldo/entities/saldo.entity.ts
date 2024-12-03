import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('financeiro')
export class Saldo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column()
  plano_id: number;

  @Column()
  saldo: number;

  @Column()
  limite_mensal: number;

  @Column()
  limite_utilizado: number;
}
