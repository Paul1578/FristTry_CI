import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, ILike } from 'typeorm';
import { Catalogo } from './entities/catalogo.entity';
import { CreateCatalogoDto } from './dto/CreateCatalogo.dto';
import { UpdateCatalogoDto } from './dto/UpdateCatalogo.dto';



@Injectable()
export class CatalogoService {
  constructor(
    @InjectRepository(Catalogo)
    private readonly catalogoRepository: Repository<Catalogo>,
  ) {}

  async getListarCatalogo(): Promise<Catalogo[]> {
    return this.catalogoRepository.find();
  }

  async findOne(id: number): Promise<Catalogo> {
    return this.catalogoRepository.findOneBy({ id });
  }

  async create(createCatalogoDto: CreateCatalogoDto): Promise<Catalogo> {
    const catalogo = this.catalogoRepository.create(createCatalogoDto);
    return this.catalogoRepository.save(catalogo);
  }

  async update(id: number, updateCatalogoDto: UpdateCatalogoDto): Promise<Catalogo> {
    await this.catalogoRepository.update(id, updateCatalogoDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<Catalogo> {
    const catalogoToRemove = await this.catalogoRepository.findOneBy({id});
    if (!catalogoToRemove) {
      throw new NotFoundException(`The Catalogue with ID ${id} is not found.`);
    }
    await this.catalogoRepository.remove(catalogoToRemove);
    return catalogoToRemove; 
  }

  async search(query: string): Promise<Catalogo[]> {
    const lowerCaseQuery = query.toLowerCase(); 
    return this.catalogoRepository.find({
      where: [
        { nombre: ILike(`%${lowerCaseQuery}%`) }, 
        { descripcion: ILike(`%${lowerCaseQuery}%`) },
      ],
    });
  }
}