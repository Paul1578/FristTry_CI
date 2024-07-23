import { Module } from '@nestjs/common';
import { CarreraService } from './carrera.service';
import { CarreraController } from './carrera.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorCatalogo } from 'src/catalogo-valor/entities/catalogo-valor.entity';
import { Carrera } from './entities/carrera.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ValorCatalogo, Carrera])],
  providers: [CarreraService],
  controllers: [CarreraController],
})
export class CarreraModule {}
