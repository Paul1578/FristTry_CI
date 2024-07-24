import { Test, TestingModule } from '@nestjs/testing';
import { CarreraController } from './carrera.controller';
import { CarreraService } from './carrera.service';
import { Carrera } from './entities/carrera.entity';
import { ValorCatalogo } from '../catalogo-valor/entities/catalogo-valor.entity';
import { Catalogo } from '../catalogos/entities/catalogo.entity';



describe('CarreraController', () => {
  let controller: CarreraController;
  let service: CarreraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarreraController],
      providers: [
        {
          provide: CarreraService,
          useValue: {
            findAll: jest.fn(),
            // Aquí podrías agregar otros métodos del servicio que vayas a probar
          },
        },
      ],
    }).compile();

    controller = module.get<CarreraController>(CarreraController);
    service = module.get<CarreraService>(CarreraService);
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
      { id: 1, coordinador: 'Hernan', docentes: ['Miguel', 'Nayheli'], periodoAcademicoId:1, nombreCarreraId: 1, periodoAcademico: expectedValorCatalogo, nombreCarrera: expectedValorCatalogo},
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(expectedCarrera);

    // Act
    const result = await controller.findAll();

    // Assert
    expect(result).toEqual(expectedCarrera);
  });
});

