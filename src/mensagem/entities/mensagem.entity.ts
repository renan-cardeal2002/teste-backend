import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('mensagens')
export class Mensagem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cliente_id: number;

  @Column()
  numero_destino: string;

  @Column()
  is_whatsapp: boolean;

  @Column()
  texto: string;

  @Column()
  data_envio: Date;
}
