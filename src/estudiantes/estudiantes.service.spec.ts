import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';

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
            // Métodos mock aquí, si es necesario
          },
        },
      ],
    }).compile();

    controller = module.get<EstudiantesController>(EstudiantesController);
    service = module.get<EstudiantesService>(EstudiantesService);
  });

  it('debería estar definido', () => {
    expect(controller).toBeDefined();
  });
});