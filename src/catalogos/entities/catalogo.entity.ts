import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { ValorCatalogo } from '../../catalogo-valor/entities/catalogo-valor.entity';

@Entity()
export class Catalogo {
  @PrimaryGeneratedColumn({ name: 'catalogoId' })
  @ApiProperty({ example: 1, description: 'El identificador único del catálogo' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Curso', description: 'El nombre del catálogo, por ejemplo, Curso' })
  nombre: string;

  @Column()
  @ApiProperty({ example: 'Lista de diferentes cursos disponibles', description: 'Descripción del catálogo, por ejemplo, una lista de diferentes cursos' })
  descripcion: string;

  @OneToMany(() => ValorCatalogo, valorCatalogo => valorCatalogo.catalogo)
  valores?: ValorCatalogo[];
}
 