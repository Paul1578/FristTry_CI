import { Module } from '@nestjs/common';
import { ProyectoService } from './proyecto.service';
import { ProyectoController } from './proyecto.controller';
import { Proyecto } from './entities/proyecto.entity';
import { Empresa } from 'src/data-empresa/entities/empresa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Proyecto,Empresa])],
  providers: [ProyectoService],
  controllers: [ProyectoController]
})
export class ProyectoModule {}
