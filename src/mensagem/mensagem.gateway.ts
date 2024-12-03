import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MensagemService } from './mensagem.service';
import { Mensagem } from './entities/mensagem.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MensagemGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly mensagensService: MensagemService) {}

  async handleConnection(client: any) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  async handleDisconnect(client: any) {
    console.log(`Cliente desconectado: ${client.id}`);
  }

  @SubscribeMessage('enviarMensagem')
  async handleEnviarMensagem(@MessageBody() mensagem: Partial<Mensagem>) {
    const novaMensagem = await this.mensagensService.create(mensagem);
    this.server.emit('mensagemRecebida', novaMensagem);
    return novaMensagem;
  }
}
