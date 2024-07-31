import { Test, TestingModule } from '@nestjs/testing';
import { DataEmpresaController } from './data-empresa.controller';
import { DataEmpresaService } from './data-empresa.service';
import { Empresa } from './entities/empresa.entity';
import { NotFoundException, HttpException, HttpStatus } from '@nestjs/common';

describe('DataEmpresaController', () => {
  let controller: DataEmpresaController;
  let service: DataEmpresaService;

  const mockEmpresaService = () => ({
    getListarEmpresa: jest.fn(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DataEmpresaController],
      providers: [
        {
          provide: DataEmpresaService,
          useValue: mockEmpresaService(),
        },
      ],
    }).compile();

    controller = module.get<DataEmpresaController>(DataEmpresaController);
    service = module.get<DataEmpresaService>(DataEmpresaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of empresas', async () => {
      // Arrange
      const expectedEmpresas: Empresa[] = [
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

      jest.spyOn(service, 'getListarEmpresa').mockResolvedValue(expectedEmpresas);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedEmpresas);
    });

    it('should throw NotFoundException if no empresas found', async () => {
      // Arrange
      jest.spyOn(service, 'getListarEmpresa').mockResolvedValue([]);

      // Act & Assert
      await expect(controller.findAll()).rejects.toThrow(
        new HttpException('Empty', HttpStatus.NOT_FOUND),
      );
    });
  });
});
