import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';
import { Estudiantes } from './entities/estudiantes.entity'; 
import { Catalogo } from '../catalogos/entities/catalogo.entity';
import { ValorCatalogo } from '../catalogo-valor/entities/catalogo-valor.entity';

describe('EstudiantesController', () => {
  let controller: EstudiantesController;
  let service: EstudiantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudiantesController],
      providers: [
        {
          provide: EstudiantesService,
          useValue: {
            findAll: jest.fn(), 
          },
        },
      ],
    }).compile();

    controller = module.get<EstudiantesController>(EstudiantesController);
    service = module.get<EstudiantesService>(EstudiantesService);
  });



  it('should return an array of students', async () => {
    // Arrange

    const expectedCatalogos: Catalogo = {
      id: 2,
      nombre: 'texto',
      descripcion: 'Descripcion 1'
    };

    const expectedValorCatalogos: ValorCatalogo = {
      id: 2,
      valor: 'texto',
      alias: 'texto',
      catalogoId: 2,
      catalogo: expectedCatalogos,
      descripcion: 'Descripcion 1'
    };

    const expectedEstudiantes: Estudiantes[] = [
      { id: 1, apellidos: 'hernan', nombres: 'Miguel', cedula: '1', carreraId: 1,nivelId:1,email:'tuliso@gmail.com',telefono:'987654321',estadoCivilId:1,tipoDeSangreId:1,domicilio:'Pisullí',contactoDeEmergencia:'Mamá',telefonoDeEmergencia:'123456789',carrera:expectedValorCatalogos,nivel:expectedValorCatalogos,estadoCivil:expectedValorCatalogos,tipoDeSangre:expectedValorCatalogos},
    ];

    jest.spyOn(service, 'findAll').mockResolvedValue(expectedEstudiantes);

    // Act
    const result = await controller.findAll();

    // Assert
    expect(result).toEqual(expectedEstudiantes);
  });
});
