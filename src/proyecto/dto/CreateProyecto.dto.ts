import { ApiProperty } from "@nestjs/swagger";

export class CreateProyectoDto {
    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    nombre:string;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    cobertura:string;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    fechaInicio:Date;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    fechaFin:Date;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    fechaInformeFinal:Date;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    periodoAcademico:string;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    empresaBeneficiariaId:number;

}