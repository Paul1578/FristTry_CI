import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';
import { ILike, Not, Repository } from 'typeorm';
import { CreateEmpresaDto} from './dto/CreateEmpresa.dto';
import { UpdateEmpresaDto } from './dto/UpdateEmpresa.dto';

@Injectable()
export class DataEmpresaService {
    constructor(
        @InjectRepository(Empresa)
        private readonly empresaRepository: Repository<Empresa>,
      ) {}

      async empresaExiste(razonSocial: string): Promise<boolean> {
        const empresa = await this.empresaRepository.findOne({ where: { razonSocial } });
        return !!empresa;
      }
    
      async getListarEmpresa(): Promise<Empresa[]> {
        return this.empresaRepository.find();
      }
    
      async findOne(id: number): Promise<Empresa> {
        return this.empresaRepository.findOneBy({ id });
      }
    
      async create(createEmpresaDto: CreateEmpresaDto): Promise<Empresa> {
        const existingEmpresa = await this.empresaRepository.findOne({ where: { razonSocial: createEmpresaDto.razonSocial } });
        if (existingEmpresa) {
          throw new ConflictException(`La razón social "${createEmpresaDto.razonSocial}" ya está en uso.`);
        }

        const empresa = this.empresaRepository.create(createEmpresaDto);
        return this.empresaRepository.save(empresa);
    }
    
    async update(id: number, updateEmpresaDto: UpdateEmpresaDto): Promise<Empresa> {
      const existingEmpresa = await this.empresaRepository.findOne({ where: { razonSocial: updateEmpresaDto.razonSocial, id: Not(id) } });
      if (existingEmpresa) {
        throw new ConflictException(`La razón social "${updateEmpresaDto.razonSocial}" ya está en uso.`);
      }

      await this.empresaRepository.update(id, updateEmpresaDto);
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
