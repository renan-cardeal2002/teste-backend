import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TipoMovimento } from '../enums/tipo.enum';

@Entity('movimentos')
export class Movimento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column()
  tipo: TipoMovimento;

  @Column()
  valor: number;

  @Column()
  observacao: string;
}
