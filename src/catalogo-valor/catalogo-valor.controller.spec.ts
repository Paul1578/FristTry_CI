import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoValorController } from './catalogo-valor.controller';
import { CatalogoValorService } from './catalogo-valor.service';
import { ValorCatalogo } from './entities/catalogo-valor.entity';
import { NotFoundException } from '@nestjs/common';

describe('CatalogoValorController', () => {
  let controller: CatalogoValorController;
  let service: CatalogoValorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatalogoValorController],
      providers: [
        {
          provide: CatalogoValorService,
          useValue: {
            findAll: jest.fn(),
            // Aquí podrías agregar otros métodos del servicio que vayas a probar
          },
        },
      ],
    }).compile();

    controller = module.get<CatalogoValorController>(CatalogoValorController);
    service = module.get<CatalogoValorService>(CatalogoValorService);
  });

  it('should return an array of ValorCatalogo', async () => {
    // Arrange
    const expectedValorCatalogos: ValorCatalogo[] = [
      { id: 1, valor: 'Valor 1', alias: 'Alias 1', descripcion: 'Descripción 1', catalogo: null, catalogoId:1 },
      { id: 2, valor: 'Valor 2', alias: 'Alias 2', descripcion: 'Descripción 2', catalogo: null, catalogoId:1 },
    ];
    jest.spyOn(service, 'findAll').mockResolvedValue(expectedValorCatalogos);

    // Act
    const result = await controller.findAll();

    // Assert
    expect(result).toEqual(expectedValorCatalogos);
  });
});
