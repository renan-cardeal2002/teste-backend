import { Test, TestingModule } from '@nestjs/testing';
import { SaldoService } from './saldo.service';

describe('FinanceiroService', () => {
  let service: SaldoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaldoService],
    }).compile();

    service = module.get<SaldoService>(SaldoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
