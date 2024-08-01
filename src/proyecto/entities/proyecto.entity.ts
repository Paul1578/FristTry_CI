import { ApiProperty } from "@nestjs/swagger";
import { Empresa } from "../../data-empresa/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proyecto {

    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID único generado automáticamente' })
    id:number;

    @ApiProperty({ example: 'John Dillan', description: 'Nombres del Estudiante' })
    @Column()
    nombre: string;

    @ApiProperty({ example: 'John Dillan', description: 'Nombres del Estudiante' })
    @Column()
    cobertura: string;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    @Column()
    fechaInicio:Date;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    @Column()
    fechaFin:Date;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    @Column()
    fechaInformeFinal:Date;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    @Column()
    periodoAcademico:string;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    @Column()
    empresaBeneficiariaId:number;

    @ManyToOne(() => Empresa, { lazy: true })
    @JoinColumn({ name: 'empresaBeneficiariaId' })
    empresaBeneficiaria: Empresa;

}