import { Test, TestingModule } from '@nestjs/testing';
import { ClienteService } from './cliente.service';
import { Repository, UpdateResult } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('ClienteService', () => {
  let service: ClienteService;
  let repository: Repository<Cliente>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: getRepositoryToken(Cliente),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and save a new cliente', async () => {
      const createClienteDto = {
        nome: 'Cliente Teste',
        email: 'teste@teste.com',
        telefone: '',
        cpf_responsavel: '',
        cnpj: '',
        nome_empresa: '',
        senha: '',
      };
      const cliente = { id: 1, ...createClienteDto };

      jest.spyOn(repository, 'create').mockReturnValue(cliente);
      jest.spyOn(repository, 'save').mockResolvedValue(cliente);

      const result = await service.create(createClienteDto);

      expect(repository.create).toHaveBeenCalledWith(createClienteDto);
      expect(repository.save).toHaveBeenCalledWith(cliente);
      expect(result).toEqual(cliente);
    });
  });

  describe('findAll', () => {
    it('should return an array of clientes', async () => {
      const clientes = [
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
        {
          id: 2,
          nome: 'Cliente Teste',
          email: 'teste@teste.com',
          telefone: '',
          cpf_responsavel: '',
          cnpj: '',
          nome_empresa: '',
          senha: '',
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(clientes);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(clientes);
    });
  });

  describe('findOne', () => {
    it('should return a single cliente by id', async () => {
      const cliente = {
        id: 1,
        nome: 'Cliente Teste',
        email: 'teste@teste.com',
        telefone: '',
        cpf_responsavel: '',
        cnpj: '',
        nome_empresa: '',
        senha: '',
      };

      jest.spyOn(repository, 'findOneBy').mockResolvedValue(cliente);

      const result = await service.findOne(1);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(result).toEqual(cliente);
    });

    it('should return undefined if cliente is not found', async () => {
      jest.spyOn(repository, 'findOneBy').mockResolvedValue(undefined);

      const result = await service.findOne(999);

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 999 });
      expect(result).toBeUndefined();
    });
  });

  describe('update', () => {
    it('should update a cliente by id', async () => {
      const updateClienteDto = { nome: 'Cliente Atualizado' };

      const mockUpdateResult: UpdateResult = {
        affected: 1,
        raw: [],
        generatedMaps: [],
      };

      jest.spyOn(repository, 'update').mockResolvedValue(mockUpdateResult);

      const result = await service.update(1, updateClienteDto);

      expect(repository.update).toHaveBeenCalledWith(1, updateClienteDto);
      expect(result).toEqual(mockUpdateResult);
    });

    it('should return affected: 0 if no cliente is updated', async () => {
      const updateClienteDto = { nome: 'Cliente Não Encontrado' };

      const mockUpdateResult: UpdateResult = {
        affected: 0,
        raw: [],
        generatedMaps: [],
      };

      jest.spyOn(repository, 'update').mockResolvedValue(mockUpdateResult);

      const result = await service.update(999, updateClienteDto);

      expect(repository.update).toHaveBeenCalledWith(999, updateClienteDto);
      expect(result).toEqual(mockUpdateResult);
    });
  });
});
