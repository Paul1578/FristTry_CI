import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Catalogo } from '../../catalogos/entities/catalogo.entity';

@Entity()
export class ValorCatalogo {
  @ApiProperty({ example: 1, description: 'ID único generado automáticamente' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'O+', description: 'Tipo de Sangre, por ejemplo, O+' })
  @Column()
  valor: string;

  @ApiProperty({ example: 'O Positivo', description: 'Alias para Tipo de Sangre, por ejemplo, O Positivo', required: false })
  @Column({ nullable: true })
  alias: string;

  @ApiProperty({ example: 1, description: 'ID del catálogo al que pertenece el valor' })
  @Column()
  catalogoId: number; 

  @ManyToOne(() => Catalogo, catalogo => catalogo.valores, { lazy: true })
  @JoinColumn({ name: 'catalogoId' }) 
  catalogo: Catalogo;

  @ApiProperty({ example: 'Persona con sangre compatible con O+', description: 'Descripción del Tipo de Sangre', required: false })
  @Column({ nullable: true })
  descripcion: string;
}
