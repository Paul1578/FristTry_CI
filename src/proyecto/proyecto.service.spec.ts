import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ProyectoService } from './proyecto.service';
import { Proyecto } from './entities/proyecto.entity';
import { Empresa } from '../data-empresa/entities/empresa.entity';

describe('ProyectoService', () => {
  let service: ProyectoService;
  let repository: Repository<Proyecto>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProyectoService,
        {
          provide: getRepositoryToken(Proyecto),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProyectoService>(ProyectoService);
    repository = module.get<Repository<Proyecto>>(getRepositoryToken(Proyecto));
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      // Arrange
      const expectedCompany: Empresa = {
        id: 1,
        razonSocial: 'Thoughtworks',
        representanteLegal: 'Pablo',
        tutorEmpresarial: 'Juan',
        cargoDelRepresentanteLegal: 'gerente',
        direccion: 'calle 3, Oe-3 165',
        telefono: '0954345754',
        email: 'Thoughtworks@gmail.com',
        provincia: 'Pichincha',
        canton: 'Quito',
        parroquia: 'Carcelen',
      };

      const expectedProjects: Proyecto[] = [
        {
          id: 1,
          nombre: 'Project 1',
          cobertura: 'Coverage 1',
          fechaInicio: new Date('2024-01-01'),
          fechaFin: new Date('2024-12-31'),
          fechaInformeFinal: new Date('2024-12-31'),
          periodoAcademico: '2024',
          empresaBeneficiaria: expectedCompany, 
          empresaBeneficiariaId:1, 
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(expectedProjects);

      // Act
      const result = await service.findAll();

      // Assert
      expect(result).toEqual(expectedProjects);
    });
  });
});
