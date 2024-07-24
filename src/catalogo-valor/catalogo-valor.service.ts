import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ValorCatalogo } from './entities/catalogo-valor.entity';
import { ILike, Repository } from 'typeorm';
import { CreateValorCatalogoDto } from './dto/CreateCatalogoValor.dto';
import { UpdateValorCatalogoDto } from './dto/UpdateCatalogoValor.dto';

@Injectable()
export class CatalogoValorService {

    constructor(
        @InjectRepository(ValorCatalogo)
        private readonly valorCatalogoRepository: Repository<ValorCatalogo>,
    ){}

    async findAll(): Promise<ValorCatalogo[]> {
        return this.valorCatalogoRepository.find({
          relations: ['catalogo'],
          select: ['id', 'valor', 'alias', 'descripcion', 'catalogo'],
        });
      }
    
    async findOne(id: number): Promise<ValorCatalogo> {
        return this.valorCatalogoRepository.findOneBy({id});
    }

    async search(query: string): Promise<ValorCatalogo[]> {
        const lowerCaseQuery = query.toLowerCase();
        try {
            const result = await this.valorCatalogoRepository.find({
                where: [
                    { valor: ILike(`%${lowerCaseQuery}%`) },
                    { alias: ILike(`%${lowerCaseQuery}%`) },
                    { descripcion: ILike(`%${lowerCaseQuery}%`) },
                    { catalogo: { nombre: ILike(`%${lowerCaseQuery}%`) } },
                    { catalogo: { descripcion: ILike(`%${lowerCaseQuery}%`) } },
                ],
                relations: ['catalogo'],
            });
            return result;
        } catch (error) {
            throw new HttpException('Catalog value not found.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async create(createValorCatalogoDto: CreateValorCatalogoDto): Promise<ValorCatalogo> {
        const valorCatalogo = this.valorCatalogoRepository.create(createValorCatalogoDto);
        return this.valorCatalogoRepository.save(valorCatalogo);
    }

    async update(id: number, updateValorCatalogoDto: UpdateValorCatalogoDto): Promise<ValorCatalogo> {
        await this.valorCatalogoRepository.update(id, updateValorCatalogoDto);
        return this.findOne(id); 
    }

    async remove(id: number): Promise<ValorCatalogo> {
        const toRemove = await this.findOne(id); 
        if (!toRemove) {
            throw new NotFoundException(`Catalog value with ID ${id} not found.`);
          }
        await this.valorCatalogoRepository.remove(toRemove);
        return toRemove;
    }

}


