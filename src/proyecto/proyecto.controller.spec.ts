import { Test, TestingModule } from '@nestjs/testing';
import { ProyectoController } from './proyecto.controller';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './entities/proyecto.entity';

describe('ProyectoController', () => {
  let controller: ProyectoController;
  let service: ProyectoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProyectoController],
      providers: [
        {
          provide: ProyectoService,
          useValue: {
            findAll: jest.fn(),
            // Puedes agregar otros métodos del servicio si es necesario
          },
        },
      ],
    }).compile();

    controller = module.get<ProyectoController>(ProyectoController);
    service = module.get<ProyectoService>(ProyectoService);
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      // Arrange
      const expectedProjects: Proyecto[] = [
        {
          id: 1,
          nombre: 'Project 1',
          cobertura: 'Coverage 1',
          fechaInicio: new Date('2024-01-01'),
          fechaFin: new Date('2024-12-31'),
          fechaInformeFinal: new Date('2024-12-31'),
          empresaBeneficiariaId: 1,
          empresaBeneficiaria: {
            id: 1,
            razonSocial: 'Thoughtworks',
            representanteLegal: 'Pablo',
            tutorEmpresarial: 'Juan',
            cargoDelRepresentanteLegal: 'gerente',
            direccion: 'calle 3, Oe-3 165',
            telefono: '',
            email: '',
            provincia: '',
            canton: '',
            parroquia: '',
          },
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedProjects);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(result).toEqual(expectedProjects);
    });
  });
});
