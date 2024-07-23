import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarreraDto {
  @ApiProperty({ example: 2, description: 'Confeccion de Ropa' })
  nombreCarreraId: number;

  @ApiProperty({
    example: 'Leonardo Paul',
    description: 'Nombres del Docente tutor',
  })
  coordinador: string;

  @ApiProperty({
    example: 'Carrillo Arce',
    description: 'Apellidos del Docente tutor',
  })
  docentes: string[];

  @ApiProperty({
    example: 2,
    description: 'Periodo Academico',
  })
  periodoAcademicoId: number;
}
