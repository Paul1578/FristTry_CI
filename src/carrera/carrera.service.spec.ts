import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CarreraService } from './carrera.service';
import { Carrera } from './entities/carrera.entity';
import { Catalogo } from 'src/catalogos/entities/catalogo.entity';
import { ValorCatalogo } from 'src/catalogo-valor/entities/catalogo-valor.entity';


describe('CarreraService', () => {
  let service: CarreraService;
  let repository: Repository<Carrera>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CarreraService,
        {
          provide: getRepositoryToken(Carrera),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<CarreraService>(CarreraService);
    repository = module.get<Repository<Carrera>>(getRepositoryToken(Carrera));
  });

  it('should return an array of carrera', async () => {
    // Arrange
    const expectedCatalogo: Catalogo = {
      id: 2,
      nombre: 'texto',
      descripcion: 'Descripcion 1'
    };

    const expectedValorCatalogo: ValorCatalogo = {
      id: 2,
      valor: 'Valor 1',
      alias: 'Alias 1',
      descripcion: 'Descripcion 1',
      catalogoId: 1,
      catalogo: expectedCatalogo
    };

    const expectedCarrera: Carrera[] = [
      { id: 1, coordinador: 'hernan', docentes: ['Miguel', 'Nayheli'], periodoAcademicoId:1, nombreCarreraId: 1, periodoAcademico: expectedValorCatalogo, nombreCarrera: expectedValorCatalogo},
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(expectedCarrera);

    // Act
    const result = await service.findAll();

    // Assert
    expect(result).toEqual(expectedCarrera);
  });
});
