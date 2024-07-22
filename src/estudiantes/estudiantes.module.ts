import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estudiante } from './estudiante.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Estudiante])],
})
export class EstudiantesModule {}
