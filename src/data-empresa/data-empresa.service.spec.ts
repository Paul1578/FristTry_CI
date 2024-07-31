import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataEmpresaService } from './data-empresa.service';
import { Empresa } from './entities/empresa.entity';

describe('DataEmpresaService', () => {
  let service: DataEmpresaService;
  let repository: Repository<Empresa>;

  const mockEmpresaRepository = () => ({
    find: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataEmpresaService,
        {
          provide: getRepositoryToken(Empresa),
          useValue: mockEmpresaRepository(),
        },
      ],
    }).compile();

    service = module.get<DataEmpresaService>(DataEmpresaService);
    repository = module.get<Repository<Empresa>>(getRepositoryToken(Empresa));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getListarEmpresa', () => {
    it('should return an array of empresas', async () => {
      const expectedEmpresa: Empresa[] = [
        {
          id: 1,
          razonSocial: 'Thowworks',
          representanteLegal: 'Josue Andrade',
          cargoDelRepresentanteLegal: 'Gerente',
          tutorEmpresarial: 'Raul Paez',
          direccion: 'Juan Capmusano Oe-3 N185',
          telefono: '0999465555',
          email: 'thowworks@gmail.com',
          provincia: 'Pichincha',
          canton: 'Quito',
          parroquia: 'Carcelén',
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(expectedEmpresa);

      const result = await service.getListarEmpresa();

      expect(result).toEqual(expectedEmpresa);
    });
  });
});
