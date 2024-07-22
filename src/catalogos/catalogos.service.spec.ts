import { Test, TestingModule } from '@nestjs/testing';
import { CatalogoService } from './catalogos.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalogo } from './entities/catalogo.entity';

describe('CatalogoService', () => {
  let service: CatalogoService;
  let repository: Repository<Catalogo>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatalogoService,
        {
          provide: getRepositoryToken(Catalogo),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CatalogoService>(CatalogoService);
    repository = module.get<Repository<Catalogo>>(getRepositoryToken(Catalogo));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('getListarCatalogo should return an array of Catalogo', async () => {
    
    const expectedCatalogos: Catalogo[] = [
      { id: 1, nombre: 'Ejemplo 1', descripcion: 'Descripción 1' },
      { id: 2, nombre: 'Ejemplo 2', descripcion: 'Descripción 2' },
    ];
    jest.spyOn(repository, 'find').mockResolvedValue(expectedCatalogos);

    const result = await service.getListarCatalogo();
    expect(result).toEqual(expectedCatalogos);
  });

  
});
