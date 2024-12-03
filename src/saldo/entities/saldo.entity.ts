import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('financeiro')
export class Saldo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column()
  plano_id: number;

  @Column({ type: 'float' })
  saldo: number;

  @Column({ type: 'float' })
  limite_mensal: number;

  @Column({ type: 'float' })
  limite_utilizado: number;
}
