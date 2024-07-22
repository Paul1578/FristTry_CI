import { ApiProperty } from "@nestjs/swagger";

export class CreateValorCatalogoDto {

  @ApiProperty({ example: 'O+', description: 'Tipo de Sangre, por ejemplo, O+' })
  valor: string;

  @ApiProperty({ example: 'O Positivo', description: 'Alias para Tipo de Sangre, por ejemplo, O Positivo' })
  alias: string;

  @ApiProperty({ example: 1, description: 'ID del catálogo al que pertenece, por ejemplo, 1 para Tipo de Sangre' })
  catalogoId: number;

  @ApiProperty({ example: 'Persona con sangre compatible con O+', description: 'Descripción del Tipo de Sangre' })
  descripcion: string;
}


