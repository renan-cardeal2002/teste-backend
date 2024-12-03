import { Test, TestingModule } from '@nestjs/testing';
import { MensagemGateway } from './mensagem.gateway';

describe('MensagemGateway', () => {
  let gateway: MensagemGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MensagemGateway],
    }).compile();

    gateway = module.get<MensagemGateway>(MensagemGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
