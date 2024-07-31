import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateEmpresaDto {
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Thowworks', description: 'El nombre de la empresa formadora' })
    razonSocial?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Josue Andrade', description: 'El nombre del representante legal de la empresa.' })
    representanteLegal?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Gerente', description: 'Cargo del representante legal en la empresa.' })
    cargoDelRepresentanteLegal?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Raul Paez', description: 'Nombre del tutor empresarial.' })
    tutorEmpresarial?: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Juan Capmusano Oe-3 N185', description: 'Direccion de la empresa.' })
    direccion: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: '0999465555', description: 'Número de teléfono de la empresa.' })
    telefono?: string;

    @IsOptional()
    @IsEmail()
    @ApiProperty({ example: 'thowworks@gmail.com', description: 'Dirección de correo electrónico de la empresa.' })
    email?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Pichincha', description: 'Provincia en la que se encuentra la empresa.' })
    provincia?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Quito', description: 'Cantón en el que se encuentra la empresa.' })
    canton?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ example: 'Carcelén', description: 'Parroquia en la que se encuentra la empresa.' })
    parroquia?: string;
}
