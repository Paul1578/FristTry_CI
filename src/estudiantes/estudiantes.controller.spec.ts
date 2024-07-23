import { Test, TestingModule } from '@nestjs/testing';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesRepository } from './estudiantes.repository';

const mockEstudiantesRepository = {
  // Agrega métodos mock aquí si es necesario
};

describe('EstudiantesController', () => {
  let controller: EstudiantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstudiantesController],
      providers: [
        EstudiantesService,
        {
          provide: EstudiantesRepository,
          useValue: mockEstudiantesRepository,
        },
      ],
    }).compile();

    controller = module.get<EstudiantesController>(EstudiantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});