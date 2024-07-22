import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoController } from './catalogos.controller';
import { CatalogoService } from './catalogos.service';
import { Catalogo } from './entities/catalogo.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('CatalogoController', () => {
  let controller: CatalogoController;
  let service: CatalogoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoController],
      providers: [
        CatalogoService,
        {
          provide: getRepositoryToken(Catalogo),
          useClass: Repository,
        },
        
      ],
    }).compile();

    controller = module.get<CatalogoController>(CatalogoController);
    service = module.get<CatalogoService>(CatalogoService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAll should return an array of Catalogo', async () => {
    const expectedCatalogos: Catalogo[] = [
      { id: 1, nombre: 'Ejemplo 1', descripcion: 'Descripción 1' },
      { id: 2, nombre: 'Ejemplo 2', descripcion: 'Descripción 2' },
    ];
    jest.spyOn(service, 'getListarCatalogo').mockResolvedValue(expectedCatalogos);

    const result = await controller.findAll();
    expect(result).toEqual(expectedCatalogos);
  });
});
