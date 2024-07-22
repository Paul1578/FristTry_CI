import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoValorService } from './catalogo-valor.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ValorCatalogo } from './entities/catalogo-valor.entity';

describe('CatalogoValorService', () => {
  let service: CatalogoValorService;
  let repository: Repository<ValorCatalogo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogoValorService,
        {
          provide: getRepositoryToken(ValorCatalogo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CatalogoValorService>(CatalogoValorService);
    repository = module.get<Repository<ValorCatalogo>>(getRepositoryToken(ValorCatalogo));
  });

  it('should return an array of ValorCatalogo', async () => {
    // Arrange
    const expectedValorCatalogos: ValorCatalogo[] = [
      { id: 1, valor: 'Valor 1', alias: 'Alias 1', descripcion: 'Descripción 1', catalogo: null, catalogoId:1 },
      { id: 2, valor: 'Valor 2', alias: 'Alias 2', descripcion: 'Descripción 2', catalogo: null, catalogoId:1 },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(expectedValorCatalogos);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).toEqual(expectedValorCatalogos);
  });
});
