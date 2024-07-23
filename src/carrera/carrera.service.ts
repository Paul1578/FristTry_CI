import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Carrera } from './entities/carrera.entity';
import { CreateCarreraDto } from './dto/CreateCarrera.dto';
import { UpdateCarreraDto } from './dto/UpdateCarrera.dto';

@Injectable()
export class CarreraService {
  constructor(
    @InjectRepository(Carrera)
    private readonly carreraRepository: Repository<Carrera>,
  ) {}

  async findAll(): Promise<Carrera[]> {
    return this.carreraRepository.find({
      relations: ['periodoAcademico', 'nombreCarrera'],
      select: ['id', 'coordinador', 'docentes'],
    });
  }

  async findOne(id: number): Promise<Carrera> {
    const carrera = await this.carreraRepository.findOne({
      where: { id },
      relations: ['periodoAcademico', 'nombreCarrera'],
    });
    if (!carrera) {
      throw new NotFoundException(`Carrera with ID ${id} not found.`);
    }
    return carrera;
  }

  async search(query: string): Promise<Carrera[]> {
    const lowerCaseQuery = `%${query.toLowerCase()}%`;
    try {
      
      const coordinadorResults = await this.carreraRepository.find({
        where: { coordinador: ILike(lowerCaseQuery) },
        relations: ['periodoAcademico', 'nombreCarrera'],
      });
  
      
      const allCarreras = await this.carreraRepository.find({
        relations: ['periodoAcademico', 'nombreCarrera'],
      });
  
      const filteredDocentesResults = allCarreras.filter(carrera =>
        carrera.docentes.some(docente => docente.toLowerCase().includes(query.toLowerCase()))
      );
  
      const combinedResults = [...new Set([...coordinadorResults, ...filteredDocentesResults])];
  
      return combinedResults;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  
  async create(createCarreraDto: CreateCarreraDto): Promise<Carrera> {
    const carrera = this.carreraRepository.create(createCarreraDto);
    return this.carreraRepository.save(carrera);
  }

  async update(
    id: number,
    updateCarreraDto: UpdateCarreraDto,
  ): Promise<Carrera> {
    await this.carreraRepository.update(id, updateCarreraDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Carrera> {
    const toRemove = await this.findOne(id);
    if (!toRemove) {
      throw new NotFoundException(`Carrera with ID ${id} not found.`);
    }
    await this.carreraRepository.remove(toRemove);
    return toRemove;
  }
}
