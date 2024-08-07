import { ApiProperty } from "@nestjs/swagger";
import { Empresa } from "../../data-empresa/entities/empresa.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Proyecto {

    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID único generado automáticamente' })
    id:number;

    @ApiProperty({ example: 'Administracion de productos', description: 'Nombre del Proyecto' })
    @Column()
    nombre: string;

    @ApiProperty({ example: 'Sierra, Pichincha, Quito, Rumipamba', description: 'Cobertura y Localización' })
    @Column()
    cobertura: string;

    @ApiProperty({ example: '2024-07-01', description: 'Fecha de inicio del proyecto' })
    @Column()
    fechaInicio:Date;


    @ApiProperty({ example: '2024-08-16', description: 'Fecha final del proyecto' })
    @Column()
    fechaFin:Date;

    @ApiProperty({ example: '2024-02-26', description: 'Fecha de informe final del proyecto' })
    @Column()
    fechaInformeFinal:Date;

    @ApiProperty({ example: 1, description: 'Empresa Beneficiaria' })
    @Column()
    empresaBeneficiariaId:number;

    @ManyToOne(() => Empresa, { lazy: true })
    @JoinColumn({ name: 'empresaBeneficiariaId' })
    empresaBeneficiaria: Empresa;
}
