import { Module } from '@nestjs/common';
import { CatalogoValorService } from './catalogo-valor.service';
import { CatalogoValorController } from './catalogo-valor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorCatalogo } from './entities/catalogo-valor.entity';
import { Catalogo } from 'src/catalogos/entities/catalogo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ValorCatalogo,  Catalogo])],
  providers: [CatalogoValorService],
  controllers: [CatalogoValorController]
})
export class CatalogoValorModule {}
