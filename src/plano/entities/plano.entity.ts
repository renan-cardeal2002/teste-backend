import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('planos')
export class Plano {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  limite_mensal: number;
}
