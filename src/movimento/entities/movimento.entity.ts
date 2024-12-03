import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('movimentos')
export class Movimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column()
  tipo: string;

  @Column()
  valor: number;

  @Column()
  observacao: string;
}
