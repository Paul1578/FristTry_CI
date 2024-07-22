import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Catalogo } from './entities/catalogo.entity';
import { ValorCatalogo } from '../catalogo-valor/entities/catalogo-valor.entity';
import { CatalogoService} from './catalogos.service';
import { CatalogoController } from './catalogos.controller';


@Module({
  imports: [TypeOrmModule.forFeature([Catalogo,  ValorCatalogo])],
  controllers: [CatalogoController],
  providers: [CatalogoService],
})
export class CatalogosModule {}
