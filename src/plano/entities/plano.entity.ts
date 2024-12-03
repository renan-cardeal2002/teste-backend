import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('planos')
export class Plano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: number;

  @Column()
  limite_mensal: number;
}
