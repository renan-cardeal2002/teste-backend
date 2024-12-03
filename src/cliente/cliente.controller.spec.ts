import { Test, TestingModule } from '@nestjs/testing';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { UpdateResult } from 'typeorm';

describe('ClienteController', () => {
  let controller: ClienteController;
  let service: ClienteService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClienteController],
      providers: [
        {
          provide: ClienteService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<ClienteController>(ClienteController);
    service = module.get<ClienteService>(ClienteService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with correct parameters', async () => {
      const createClienteDto: CreateClienteDto = {
        nome: 'Cliente Teste',
        email: 'teste@teste.com',
        telefone: '',
        cpf_responsavel: '',
        cnpj: '',
        nome_empresa: '',
        senha: '',
      };
      const result = { id: 1, ...createClienteDto };

      jest.spyOn(service, 'create').mockResolvedValue(result);

      expect(await controller.create(createClienteDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createClienteDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of clientes', async () => {
      const result = [
        {
          id: 1,
          nome: 'Cliente Teste',
          email: 'teste@teste.com',
          telefone: '',
          cpf_responsavel: '',
          cnpj: '',
          nome_empresa: '',
          senha: '',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single cliente by id', async () => {
      const result = {
        id: 1,
        nome: 'Cliente Teste',
        email: 'teste@teste.com',
        telefone: '',
        cpf_responsavel: '',
        cnpj: '',
        nome_empresa: '',
        senha: '',
      };

      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });

    it('should return undefined if cliente is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(undefined);

      expect(await controller.findOne('999')).toBeUndefined();
      expect(service.findOne).toHaveBeenCalledWith(999);
    });
  });

  describe('update', () => {
    it('should update a cliente by id and return affected rows', async () => {
      const updateClienteDto: UpdateClienteDto = { nome: 'Cliente Atualizado' };
      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: [],
        generatedMaps: [],
      };

      jest.spyOn(service, 'update').mockResolvedValue(mockUpdateResult);

      const result = await controller.update('1', updateClienteDto);

      expect(service.update).toHaveBeenCalledWith(1, updateClienteDto);
      expect(result).toEqual(mockUpdateResult);
    });

    it('should return affected: 0 if no cliente is updated', async () => {
      const updateClienteDto: UpdateClienteDto = {
        nome: 'Cliente Não Encontrado',
      };
      const mockUpdateResult: UpdateResult = {
        affected: 0,
        raw: [],
        generatedMaps: [],
      };

      jest.spyOn(service, 'update').mockResolvedValue(mockUpdateResult);

      const result = await controller.update('999', updateClienteDto);

      expect(service.update).toHaveBeenCalledWith(999, updateClienteDto);
      expect(result).toEqual(mockUpdateResult);
    });
  });
});
