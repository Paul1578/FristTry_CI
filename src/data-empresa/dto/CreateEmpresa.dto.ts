import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateEmpresaDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Thoughtworks', description: 'El nombre de la empresa formadora.' })
    razonSocial: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Josue Andrade', description: 'El nombre del representante legal de la empresa.' })
    representanteLegal: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Gerente', description: 'Cargo del representante legal en la empresa.' })
    cargoDelRepresentanteLegal: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Raul Paez', description: 'Nombre del tutor empresarial.' })
    tutorEmpresarial: string;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Juan Capmusano Oe-3 N185', description: 'Direccion de la empresa.' })
    direccion: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: '0999465555', description: 'Número de teléfono de la empresa.' })
    telefono: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ example: 'Thoughtworks@gmail.com', description: 'Dirección de correo electrónico de la empresa.' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Pichincha', description: 'Provincia en la que se encuentra la empresa.' })
    provincia: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Quito', description: 'Cantón en el que se encuentra la empresa.' })
    canton: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ example: 'Carcelén', description: 'Parroquia en la que se encuentra la empresa.' })
    parroquia: string;
}
