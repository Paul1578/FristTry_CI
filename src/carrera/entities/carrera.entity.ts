import { ApiProperty } from '@nestjs/swagger';
import { ValorCatalogo } from '../../catalogo-valor/entities/catalogo-valor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Carrera {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'ID único generado automáticamente' })
  id: number;

  @ApiProperty({
    example: 'Hernan Pepito',
    description: 'Nombres del coordinador de carrera',
  })
  @Column()
  coordinador: string;

  @ApiProperty({
    example: 'Leonardo Paul',
    description: 'Nombres del Docente tutor',
  })
  @Column('text', { array: true })
  docentes: string[];

  @Column()
  periodoAcademicoId: number;

  @Column()
  nombreCarreraId: number;

  @ManyToOne(() => ValorCatalogo, { lazy: true })
  @JoinColumn({ name: 'periodoAcademicoId' })
  periodoAcademico: ValorCatalogo;

  @ManyToOne(() => ValorCatalogo, { lazy: true })
  @JoinColumn({ name: 'nombreCarreraId' })
  nombreCarrera: ValorCatalogo;
}
