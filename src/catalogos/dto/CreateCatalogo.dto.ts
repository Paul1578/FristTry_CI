import { ApiProperty } from "@nestjs/swagger";

export class CreateCatalogoDto {
  @ApiProperty({ example: 'Tipo de Sangre', description: 'El nombre del catálogo, por ejemplo, Tipo de Sangre' })
  nombre: string;

  @ApiProperty({ example: 'Lista de diferentes tipos de sangre disponibles', description: 'Descripción del catálogo, por ejemplo, una lista de diferentes tipos de sangre' })
  descripcion: string;
}