import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["razonSocial"]) 
export class Empresa {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID único generado automáticamente.' })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'Thoughtworks', description: 'El nombre de la empresa formadora.' })
    razonSocial: string;

    @Column()
    @ApiProperty({ example: 'Josue Andrade', description: 'El nombre del representante legal de la empresa.' })
    representanteLegal: string;

    @Column()
    @ApiProperty({ example: 'Gerente', description: 'Cargo del representante legal en la empresa.' })
    cargoDelRepresentanteLegal: string;

    @Column()
    @ApiProperty({ example: 'Raul Paez', description: 'Nombre del tutor empresarial.' })
    tutorEmpresarial: string;
    
    @Column()
    @ApiProperty({ example: 'Juan Capmusano Oe-3 N185', description: 'Direccion de la empresa.' })
    direccion: string;

    @Column()
    @ApiProperty({ example: '0999465555', description: 'Número de teléfono de la empresa.' })
    telefono: string;

    @Column()
    @ApiProperty({ example: 'Thoughtworks@gmail.com', description: 'Dirección de correo electrónico de la empresa.' })
    email: string;

    @Column()
    @ApiProperty({ example: 'Pichincha', description: 'Provincia en la que se encuentra la empresa.' })
    provincia: string;

    @Column()
    @ApiProperty({ example: 'Quito', description: 'Cantón en el que se encuentra la empresa.' })
    canton: string;

    @Column()
    @ApiProperty({ example: 'Carcelén', description: 'Parroquia en la que se encuentra la empresa.' })
    parroquia: string;
}
