import { ApiProperty } from "@nestjs/swagger";

export class CreateProyectoDto {

    @ApiProperty({ example: 'Administracion de Productos', description: 'Nombre del Proyecto' })
    nombre:string;

    @ApiProperty({ example: 'Sierra, Pichincha, Quito, Rumipamba', description: 'Cobertura y Localización' })
    cobertura:string;

    @ApiProperty({ example: '2024-07-01', description: 'Fecha de inicio del proyecto' })
    fechaInicio:Date;


    @ApiProperty({ example: '2024-08-16', description: 'Fecha final del proyecto' })
    fechaFin:Date;

    @ApiProperty({ example: '2024-02-26', description: 'Fecha de informe final del proyecto' })
    fechaInformeFinal:Date;

    @ApiProperty({ example: 1, description: 'Empresa Beneficiaria' })
    empresaBeneficiariaId:number;
}
