import { Module } from '@nestjs/common';
import { DataEmpresaController } from './data-empresa.controller';
import { DataEmpresaService } from './data-empresa.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empresa } from './entities/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Empresa])],
  controllers: [DataEmpresaController],
  providers: [DataEmpresaService]
})
export class DataEmpresaModule {}
