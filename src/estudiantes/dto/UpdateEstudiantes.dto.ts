import { ApiProperty } from "@nestjs/swagger";


export class UpdateEstudiantesDto {

  @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
  apellidos: string;
  
  @ApiProperty({ example: 'John Dillan', description: 'Nombres del Estudiante' })
  nombres: string;
  
  @ApiProperty({ example: 12345677907, description: 'Cédula del Estudiante' })
  cedula: string;
  
  @ApiProperty({ example: 2, description: 'Teléfono del Estudiante' })
  carreraId: number;
  
  @ApiProperty({ example: 2, description: 'Teléfono del Estudiante' })
  nivelId: number;
  
  @ApiProperty({ example: 'tuliso@gmail.com', description: 'Correo del Estudiante' })
  email: string;
  
  @ApiProperty({ example: 99839292, description: 'Teléfono del Estudiante' })
  telefono: string;
  
  @ApiProperty({ example: 2, description: 'Teléfono del Estudiante' })
  estadoCivilId: number;
  
  @ApiProperty({ example: 2, description: 'Teléfono del Estudiante' })
  tipoDeSangreId: number;
  
  @ApiProperty({ example: 'Pisulli', description: 'Domicilio del Estudiante' })
  domicilio: string;
  
  @ApiProperty({ example: 'Mamá', description: 'Parentesco con el Estudiante' })
  contactoDeEmergencia: string;
  
  @ApiProperty({ example: 9987654312, description: 'Teléfono del contacto de emergencia del Estudiante' })
  telefonoDeEmergencia: string;
}
