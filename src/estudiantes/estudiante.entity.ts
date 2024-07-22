import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Estudiante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  apellidos: string;

  @Column()
  nombres: string;

  @Column()
  cedula: string;

  @Column()
  carrera: string;

  @Column()
  nivel: string;

  @Column()
  email: string;

  @Column()
  telefono: string;

  @Column()
  estadoCivil: string;

  @Column()
  tipoSangre: string;

  @Column()
  domicilio: string;

  @Column()
  contactoEmergencia: string;

  @Column()
  telefonoEmergencia: string;
}
