import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { ILike, Repository } from 'typeorm';
import { CreateEmpresaDto} from './dto/CreateEmpresa.dto';
import { UpdateEmpresaDto } from './dto/UpdateEmpresa.dto';

@Injectable()
export class DataEmpresaService {
    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>,
      ) {}
    
      async getListarEmpresa(): Promise<Empresa[]> {
        return this.empresaRepository.find();
      }
    
      async findOne(id: number): Promise<Empresa> {
        return this.empresaRepository.findOneBy({ id });
      }
    
      async create(createCatalogoDto: CreateEmpresaDto): Promise<Empresa> {
        const catalogo = this.empresaRepository.create(createCatalogoDto);
        return this.empresaRepository.save(catalogo);
      }
    
      async update(id: number, updateCatalogoDto: UpdateEmpresaDto): Promise<Empresa> {
        await this.empresaRepository.update(id, updateCatalogoDto);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<Empresa> {
        const catalogoToRemove = await this.empresaRepository.findOneBy({id});
        if (!catalogoToRemove) {
          throw new NotFoundException(`The Catalogue with ID ${id} is not found.`);
        }
        await this.empresaRepository.remove(catalogoToRemove);
        return catalogoToRemove; 
      }
    
      async search(query: string): Promise<Empresa[]> {
        const lowerCaseQuery = query.toLowerCase(); 
        return this.empresaRepository.find({
          where: [
            { razonSocial: ILike(`%${lowerCaseQuery}%`) }, 
            { representanteLegal: ILike(`%${lowerCaseQuery}%`) },
            { cargoDelRepresentanteLegal: ILike(`%${lowerCaseQuery}%`) },
            { tutorEmpresarial: ILike(`%${lowerCaseQuery}%`) },
            { telefono: ILike(`%${lowerCaseQuery}%`) },
            { email: ILike(`%${lowerCaseQuery}%`) },
            { provincia: ILike(`%${lowerCaseQuery}%`) },
            { canton: ILike(`%${lowerCaseQuery}%`) },
            { parroquia: ILike(`%${lowerCaseQuery}%`) },
          ],
        });
      }
}
