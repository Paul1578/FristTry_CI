import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Proyecto } from './entities/proyecto.entity';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProyectoDto } from './dto/CreateProyecto.dto';
import { UpdateProjectDto } from './dto/UpdateProyecto.dto';

@Injectable()
export class ProyectoService {
    constructor(
        @InjectRepository(Proyecto)
        private readonly proyectoRepository: Repository<Proyecto>,
      ) {}
    
      async findAll(): Promise<Proyecto[]> {
        return this.proyectoRepository.find({
          relations: ['empresaBeneficiaria'],
          select: ['id', 'nombre','cobertura', 'fechaInicio','fechaFin','fechaInformeFinal','empresaBeneficiaria'],
        });
      }
    
      async findOne(id: number): Promise<Proyecto> {
        const Proyecto = await this.proyectoRepository.findOne({
          where: { id },
          relations: ['empresaBeneficiaria'],
        });
        if (!Proyecto) {
          throw new NotFoundException(`The project with ID ${id} is not found.`);
        }
        return Proyecto;
      }
    
      async search(query: string): Promise<Proyecto[]> {
        const lowerCaseQuery = query.toLowerCase();
  
        try {
          const results = await this.proyectoRepository.find({
            where: [
              { nombre: ILike(`%${lowerCaseQuery}%`) },
              { cobertura: ILike(`%${lowerCaseQuery}%`) },
            ],
            relations: ['empresaBeneficiaria'],
          });    
  
          return results;
        } catch (error) {
          throw new HttpException(
            'Project not found.',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        }
      }
      
    
      async create(createProyectoDto: CreateProyectoDto): Promise<Proyecto> {
        const { fechaInicio, fechaFin, fechaInformeFinal } = createProyectoDto;

        if (fechaInicio >= fechaFin) {
            throw new HttpException('La fecha de inicio debe ser anterior a la fecha de fin.', HttpStatus.BAD_REQUEST);
        }

        if (fechaFin > fechaInformeFinal) {
            throw new HttpException('La fecha de fin debe ser anterior a la fecha del informe final.', HttpStatus.BAD_REQUEST);
        }

        if (fechaInicio > fechaInformeFinal || fechaFin > fechaInformeFinal) {
            throw new HttpException('La fecha del informe final debe ser posterior a la fecha de inicio y la fecha de fin.', HttpStatus.BAD_REQUEST);
        }

        const proyecto = this.proyectoRepository.create(createProyectoDto);
        return this.proyectoRepository.save(proyecto);
    }

    
      async update(
        id: number,
        updateProyectoDto: UpdateProjectDto,
      ): Promise<Proyecto> {
        await this.proyectoRepository.update(id, updateProyectoDto);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<Proyecto> {
        const toRemove = await this.findOne(id);
        if (!toRemove) {
          throw new NotFoundException(`The project with ID ${id} is not found.`);
        }
        await this.proyectoRepository.remove(toRemove);
        return toRemove;
      }
    }

