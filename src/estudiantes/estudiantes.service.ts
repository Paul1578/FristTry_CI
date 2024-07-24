import { HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Like, Repository } from 'typeorm';
import { Estudiantes } from './entities/estudiantes.entity';
import { CreateEstudiantesDto } from './dto/CreateEstudiantes.dto';
import { UpdateEstudiantesDto } from './dto/UpdateEstudiantes.dto';
           


  @Injectable()
  export class EstudiantesService {
    constructor(
      @InjectRepository(Estudiantes)
      private readonly estudiantesRepository: Repository<Estudiantes>,
    ) {}
  
    async findAll(): Promise<Estudiantes[]> {
      return this.estudiantesRepository.find({
        relations: ['carrera', 'nivel','estadoCivil','tipoDeSangre'],
        select: ['id', 'apellidos','nombres', 'cedula','email','telefono','domicilio','contactoDeEmergencia','telefonoDeEmergencia'],
      });
    }
  
    async findOne(id: number): Promise<Estudiantes> {
      const Estudiantes = await this.estudiantesRepository.findOne({
        where: { id },
        relations: ['carrera', 'nivel','estadoCivil','tipoDeSangre'],
      });
      if (!Estudiantes) {
        throw new NotFoundException(`The Estudiante with ID ${id} is not found.`);
      }
      return Estudiantes;
    }
  
    async search(query: string): Promise<Estudiantes[]> {
      const lowerCaseQuery = query.toLowerCase();

      try {
        const results = await this.estudiantesRepository.find({
          where: [
            { apellidos: ILike(`%${lowerCaseQuery}%`) },
            { nombres: ILike(`%${lowerCaseQuery}%`) },
            { cedula: Like(`%${lowerCaseQuery}%`)},
            { email: ILike(`%${lowerCaseQuery}%`) },
            { telefono: ILike(`%${lowerCaseQuery}%`) },
            { domicilio: ILike(`%${lowerCaseQuery}%`) },
            { telefonoDeEmergencia: ILike(`%${lowerCaseQuery}%`) },
            { tipoDeSangre: { nombre: ILike(`%${lowerCaseQuery}%`) } },
            { tipoDeSangre: { descripcion: ILike(`%${lowerCaseQuery}%`) } },
            { estadoCivil: { nombre: ILike(`%${lowerCaseQuery}%`) } },
            { estadoCivil: { descripcion: ILike(`%${lowerCaseQuery}%`) } },
            { nivel: { nombre: ILike(`%${lowerCaseQuery}%`) } },
            { nivel: { descripcion: ILike(`%${lowerCaseQuery}%`) } },
            { carrera: { nombre: ILike(`%${lowerCaseQuery}%`) } },
            { carrera: { descripcion: ILike(`%${lowerCaseQuery}%`) } },
          ],
          relations: ['carrera', 'nivel', 'estadoCivil', 'tipoDeSangre'],
        });    

        return results;
      } catch (error) {
        throw new HttpException(
          'Estudiante not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
    
  
    async create(createEstudiantesDto: CreateEstudiantesDto): Promise<Estudiantes> {
      const Estudiantes = this.estudiantesRepository.create(createEstudiantesDto);
      return this.estudiantesRepository.save(Estudiantes);
    }
  
    async update(
      id: number,
      updateEstudiantesDto: UpdateEstudiantesDto,
    ): Promise<Estudiantes> {
      await this.estudiantesRepository.update(id, updateEstudiantesDto);
      return this.findOne(id);
    }
  
    async remove(id: number): Promise<Estudiantes> {
      const toRemove = await this.findOne(id);
      if (!toRemove) {
        throw new NotFoundException(`The Estudiante with ID ${id} is not found.`);
      }
      await this.estudiantesRepository.remove(toRemove);
      return toRemove;
    }
  }
  


  
