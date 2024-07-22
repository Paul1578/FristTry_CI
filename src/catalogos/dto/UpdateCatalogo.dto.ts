import { ApiProperty } from "@nestjs/swagger";

export class UpdateCatalogoDto {
  @ApiProperty({ example: 'Período Académico', description: 'El nombre actualizado del catálogo, por ejemplo, Período Académico' })
  nombre?: string;

  @ApiProperty({ example: 'Lista de diferentes períodos académicos disponibles', description: 'Descripción actualizada del catálogo, por ejemplo, una lista de diferentes períodos académicos' })
  descripcion?: string;
}