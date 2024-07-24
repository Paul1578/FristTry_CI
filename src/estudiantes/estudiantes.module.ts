import { Module } from '@nestjs/common';
import { EstudiantesService } from './estudiantes.service';
import { EstudiantesController } from './estudiantes.controller';
import { Estudiantes } from './entities/estudiantes.entity';
import { Catalogo } from 'src/catalogos/entities/catalogo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiantes,Catalogo])],
  providers: [EstudiantesService],
  controllers: [EstudiantesController]
})
export class EstudiantesModule {}

