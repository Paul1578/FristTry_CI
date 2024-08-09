import { ApiProperty } from '@nestjs/swagger';
import { ValorCatalogo } from '../../catalogo-valor/entities/catalogo-valor.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, Generated } from 'typeorm';
import { Proyecto } from '../../proyecto/entities/proyecto.entity';


@Entity()
export class Estudiantes {

    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'ID único generado automáticamente' })
    id:number;

    @ApiProperty({ example: 'Cárdenas Valle', description: 'Apellidos del Estudiante' })
    @Column()
    apellidos: string;

    @ApiProperty({ example: 'John Dillan', description: 'Nombres del Estudiante' })
    @Column()
    nombres: string;
  
    @ApiProperty({ example: 12345677907, description: 'Cédula del Estudiante' })
    @Column()
    cedula: string;

    @Column()
    carreraId: number;

    @Column()
    nivelId: number;

    @ApiProperty({ example: 'tuliso@gmail.com', description: 'Correo del Estudiante' })
    @Column()
    email: string;

    @ApiProperty({ example: 99839292, description: 'Teléfono del Estudiante' })
    @Column()
    telefono: string;

    @Column()
    estadoCivilId: number;

    @Column()
    tipoDeSangreId: number;
    
    @Column({ nullable: true })
    proyectoEmpresarialId: number;

    @ApiProperty({ example: 'Pisulli', description: 'Domicilio del Estudiante' })
    @Column()
    domicilio: string;

    @ApiProperty({ example: 'Mamá', description: 'Parentesco con el Estudiante' })
    @Column()
    contactoDeEmergencia: string;

    @ApiProperty({ example: 9987654312, description: 'Teléfono del contacto de emergencia del Estudiante' })
    @Column()
    telefonoDeEmergencia: string;
    
    @ManyToOne(() => ValorCatalogo, { lazy: true })
    @JoinColumn({ name: 'carreraId' })
    carrera: ValorCatalogo;

    @ManyToOne(() => ValorCatalogo, { lazy: true })
    @JoinColumn({ name: 'nivelId' })
    nivel: ValorCatalogo;

    @ManyToOne(() => ValorCatalogo, { lazy: true })
    @JoinColumn({ name: 'estadoCivilId' })
    estadoCivil: ValorCatalogo;

    @ManyToOne(() => ValorCatalogo, { lazy: true })
    @JoinColumn({ name: 'tipoDeSangreId' })
    tipoDeSangre: ValorCatalogo

    @ManyToOne(() => Proyecto, { lazy: true, nullable: true  })
    @JoinColumn({ name: 'proyectoEmpresarialId' })
    proyectoEmpresarial?: Proyecto
}
