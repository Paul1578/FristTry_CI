
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProyectoDto {
    @ApiProperty({ example: 'Administracion de Productos', description: 'Nombre del proyecto' })
    nombre:string;

    @ApiProperty({ example: 'Sierra, Pichincha, Quito, Rumipamba', description: 'Cobertura y Localización' })
    cobertura:string;

    @ApiProperty({ example: '2024-07-01', description: 'Fecha de inicio del proyecto' })
    fechaInicio:Date;

    @ApiProperty({ example: '2024-08-16', description: 'Fecha de final del proyecto' })
    fechaFin:Date;

    @ApiProperty({ example: '2024-02-26', description: 'Fecha del informe final del proyecto' })
    fechaInformeFinal:Date;

    @ApiProperty({ example: 1, description: 'Empresa Beneficiaria ' })
    empresaBeneficiariaId:number;
}
