import { ApiProperty } from '@nestjs/swagger';

export class CreateCarreraDto {
  @ApiProperty({ example: 1, description: 'Confección de Ropa' })
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
    description: 'Periodo Académico',
  })
  periodoAcademicoId: number;
}
