import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiantes } from './entities/estudiantes.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ValorCatalogo } from 'src/catalogo-valor/entities/catalogo-valor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiantes,ValorCatalogo])],
  providers: [EstudiantesService],
  controllers: [EstudiantesController]
})
export class EstudiantesModule {}

